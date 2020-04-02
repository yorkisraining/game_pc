<!-- personal/base 基本信息 -->
<template>
    <div class="base_box">
        <div class="base_controlls">
            <div class="controlls_items">
                <div class="item_title">账号: </div>
                <input type="text" v-model="userMsg.agentCode" class="item_input" placeholder="" disabled>
            </div>
            <div class="controlls_items">
                <div class="item_title">姓名: </div>
                <input type="text" v-model="userMsg.realName" class="item_input" placeholder="">
            </div>
            <div class="controlls_items">
                <div class="item_title">邮箱: </div>
                <input type="text" v-model="userMsg.email" class="item_input" placeholder="">
            </div>
            <div class="controlls_items">
                <div class="item_title">手机: </div>
                <input type="text" v-model="userMsg.phone" class="item_input" placeholder="">
            </div>
            <div class="controlls_items">
                <div class="item_title">qq: </div>
                <input type="text" v-model="userMsg.qq" class="item_input" placeholder="">
            </div>
            <div class="tips controlls_items">
                以上信息请确保真实有效，后期方便提现和找回密码。如需修改，请联系客服。
            </div>
        </div>
        <div class="submit_btn" @click="submit" v-if="!ifDisabled">确&nbsp;&nbsp;&nbsp;认</div>

        <msgBox v-if="isShowMsgBox" :value="msgBox" @closeMsgBox="closeMsgBox"></msgBox>
    </div>
</template>

<script>
import { ajaxPost, ajaxGet } from '@/common/js/public'
import { apiUrl } from '@/common/js/api'
import msgBox from '@/components/msgBox'

export default {
    data () {
        return {
            userMsg: {
                id: '',
                agentCode: '',
                email: '',
                phone: '',
                filterPhone: '',
                realName: '',
                qq: '',
            },
            isShowMsgBox: false,
            msgBox: '',
            isShowMsgBoxWithCancel: false,
            msgBoxWithCancel: '请确定所提交信息正确，将影响后期提现。如需修改个人信息，请联系客服',
            ifCancel: false,
            ifDisabled: false
        };
    },
    components: {msgBox},
    created() {
        //获取信息
        let msg = localStorage.getItem('agentData') ? JSON.parse(localStorage.getItem('agentData')) : {};
        
        this.userMsg.id = msg.id;
        this.userMsg.agentCode = msg.agentCode;
        this.userMsg.email = msg.email;
        this.userMsg.phone = msg.phone;
        this.userMsg.realName = msg.realName;
        this.userMsg.qq = msg.qq;
    },
    methods: {
        filterEmail(val) {
            let arr = val.split('@'),
                arr2 = arr[0].split(''),
                newEmail = `${arr2[0]}****${arr2[arr2.length - 1]}@${arr[1]}`;
            return newEmail;
        },
        showMsgBox(val) {
            this.isShowMsgBox = true;
            this.msgBox = val;
        },
        closeMsgBox() {
            this.isShowMsgBox = false;
        },
        confirmMsgBoxWithCancel() {
            this.isShowMsgBoxWithCancel = false;
        },
        submit() {
            if (!this.userMsg.agentCode || !this.userMsg.email || !this.userMsg.phone || !this.userMsg.qq || !this.userMsg.realName) {
                this.showMsgBox('请完善所有信息，否则无法提现');
                return false;
            }

            let mreg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
            if (!mreg.test(this.userMsg.mobile)) {
                //提示手机号
                this.showMsgBox('手机号不合理');
                return false;
            }

            let mailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
            if (!mailReg.test(this.userMsg.email) && this.userMsg.email != null && this.userMsg.email) {
                //提示邮箱不合理
                this.showMsgBox('请输入正确的邮箱地址')
                return false;
            }

            this.isShowMsgBoxWithCancel = true;

            if (!this.ifCancel) {
                ajaxPost(apiUrl.agentUpdate, {
                    agentCode: this.userMsg.agentCode,
                    email: this.userMsg.email,
                    phone: this.userMsg.phone,
                    qq: this.userMsg.qq,
                    realName: this.userMsg.realName
                }, res => {
                    //修改成功
                    if (res.code != 500) {
                        let msg = localStorage.getItem('agentData') ? JSON.parse(localStorage.getItem('agentData')) : {};

                        msg.id = this.userMsg.id;
                        msg.agentCode = this.userMsg.agentCode;
                        msg.email = this.userMsg.email;
                        msg.phone = this.userMsg.phone;
                        msg.realName = this.userMsg.realName;
      
                        this.showMsgBox('修改成功');
                    }
                })
            }
        }
    }
}

</script>
<style lang='less' scoped>
.base_box {
    margin-top: 16px;
    .base_controlls {
        padding: 0 50px;
        margin: 16px 0;
        border-bottom: 1px solid rgba(40, 43, 58, .6);
        .controlls_items {
            display: flex;
            font-size: 16px;
            align-items: center;
            justify-content: center;
            margin-bottom: 16px;
            color: #9198AC;
            position: relative;
            .item_title {
                width: 100px;
            }
            .item_input {
                width: 350px;
                height: 38px;
                line-height: 38px;
                border: 1px solid rgba(40,43,58,1);
                border-radius: 4px;
                padding-left: 10px;
                background-color: transparent;
                &.time {
                    border: none;
                    padding: 0;
                }
            }
            .can_use {
                color: #B53132;
                font-size: 14px;
                margin-left: 20px;
            }
            .refresh_money {
                color: #A95C36;
                cursor: pointer;
                font-size: 14px;
                margin-left: 20px;
                i {
                    margin-right: 5px;
                    font-weight: bold;
                }
            }
            .bind_card {
                color: #556fb7;
                text-decoration: underline;
                margin-left: 20px;
                cursor: pointer;
            }
            &.tips {
                margin: 16px;
                color: #b53132;
                font-size: 14px;
            }
        }
    }
    .submit_btn {
        width: 150px;
        height: 38px;
        line-height: 38px;
        border-radius: 4px;
        cursor: pointer;
        text-align: center;
        color: #5B3A0C;
        background-image: url(../../../assets/btn_bg.png);
        margin: 20px auto;
    }
}
</style>