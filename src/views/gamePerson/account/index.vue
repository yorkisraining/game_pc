<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-01 17:50:30
 * @LastEditTime: 2019-08-14 14:43:58
 * @LastEditors: Please set LastEditors
 -->
<!-- bank/huzhuan 金币互转 -->
<template>
    <div class="huzhuan_box">
        <div class="huzhuan_title">
            账户列表（RMB）
            <div class="refresh_money" @click="refresh">
                <i class="el-icon-refresh"></i>刷新
            </div>
        </div>
        <div class="huzhuan_account_wrap" >
            <div class="huzhuan_account" :style="{'width': accountWidth}">
                <div class="account_item"  v-for="item in accountList" :key="'a' + item.id">
                    <div>{{item.walletName}}</div>
                    <div>{{item.unusedCoin | filterMoney}}</div>
                </div>
            </div>
        </div>
        <div class="yue">
            <div>未结算余额：{{yue}}</div>
        </div>
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
            accountList: [],
            inBank: '', //转入平台
            outBank: '', //转出平台
            holderIn: '',
            holderOut: '',
            price: '', //金额
            password: '',
            isShowMsgBox: false,
            msgBox: '',
            accountWidth: 0,
            yue: 0,
        };
    },
    filters: {
        filterMoney(val) {
            return val.toFixed(2);
        }
    },
    components: {msgBox},
    created() {
        this.getAccount();
    },
    methods: {
        refresh() {
          ajaxGet(apiUrl.freshWallet, {}, res => {
            if (res.code == 500) {
              this.showMsgBox(res.msg);
              return false;
            }
            //提示转入成功，刷新列表
            this.showMsgBox('操作成功');
            this.getAccount();
          })
        },
        findWallet(id) {
            for (let i=0; i<this.accountList.length; i++) {
                if (this.accountList[i].id == id) {
                    return this.accountList[i];
                }
            }
        },
        changeMainWalletName(arr) {
            for (let i=0; i<this.accountList.length; i++) {
                try {
                    if (this.accountList[i].mainFlag == 1) {
                        this.accountList[i].walletName = '主金库';
                        throw Error('break loop;;');
                    }
                } catch (error) {

                }
            }
        },
        getAccount() {
            //获取各个账户信息
            ajaxGet(apiUrl.getWalletCoin, {}, res => {
                if (res.code != 500) {
                    this.accountList = res.acctInfoDto.acctInfoList;
                    this.changeMainWalletName();
                    //初始化inbank outbank,holderIn,holderOut为第一个账户
                    if (this.accountList.length > 8) {
                        this.inBank = this.outBank = this.accountList[0].id;
                        this.holderIn = this.holderOut = this.accountList[0].walletName;
                        this.accountWidth = this.accountList.length * 120 + 'px';
                        return false;
                    }
                    this.accountWidth = '100%';
                }
            })
        },
        showMsgBox(val) {
            this.isShowMsgBox = true;
            this.msgBox = val;
        },
        closeMsgBox() {
            this.isShowMsgBox = false;
        },
    }
}

</script>
<style lang='less' scoped>
.huzhuan_box {
    margin-top: 30px;
    .huzhuan_title {
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #9198AC;
        font-size: 22px;
        position: relative;
        background-color: rgba(15,15,17,1);
        .refresh_money {
            color: #A95C36;
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            i {
                margin-right: 5px;
                font-weight: bold;
            }
            .text {
                position: absolute;
                color: rgba(246,82,39,.8);
                font-size: 16px;
                bottom: -28px;
                left: -76px;
                width: 220px;
            }
        }
    }
    .huzhuan_account_wrap {
        width: 100%;
        overflow-x: auto;
        .huzhuan_account {
            display: flex;
            .account_item {
                flex: 1;
                text-align: center;
                background-image: linear-gradient(145deg,rgba(19,20,34,0.68),rgba(19,20,34,0) );
                color: #9198AC;
                font-size: 16px;
                width: 120px;
                div {
                    height: 50px;
                    line-height: 50px;
                    border-bottom: 1px solid #464A5E;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
        &::-webkit-scrollbar{
            width: 5px;
            height: 5px;
        }
        &::-webkit-scrollbar-track{
            background: #f6f6f6;
            border-radius:2px;
        }
        &::-webkit-scrollbar-thumb{
            background: #aaa;
            border-radius: 2px;
        }
        &::-webkit-scrollbar-thumb:hover{
            background: #747474;
        }
        &::-webkit-scrollbar-corner{
            background: #f6f6f6;
        }

    }

    .huzhuan_controlls {
        margin: 30px 0;
        border-bottom: 1px solid rgba(40, 43, 58, .6);
        .controlls_items {
            display: flex;
            font-size: 16px;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
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
            }
            .limit_price {
                position: absolute;
                left: 76%;
                font-size: 14px;
                color: #556FB7;
            }
            .tips {
                color: #B53132;
                position: absolute;
                left: 76%;
                font-size: 14px;
            }
        }
    }
    .btn {
        position: relative;
        margin-bottom: 20px;
        .submit_btn {
            margin: 0 auto;
            width: 150px;
            height: 38px;
            line-height: 38px;
            border-radius: 4px;
            cursor: pointer;
            text-align: center;
            color: #5B3A0C;
            background-image: url(../../../assets/btn_bg.png);
        }
        .all_btn {
            position: absolute;
            left: 62%;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            color: #B53132;
            text-decoration: underline;
        }
    }

}
</style>
