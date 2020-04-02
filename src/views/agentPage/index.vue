<template>
    <div>
        <div class="index_header contain_1200">
            <div class="logo_box" @click="returnToIndex">
                <img src="@/assets/logo.png" alt="" class="logo_img">
            </div>
            <div class="controlls_box">
                <div class="controlls_item_left">
                    <div class="controlls_item_top">
                        <!-- <div class="user_count" @click="openPopup('')">我的账户</div> -->
                        <div class="username" @click="openPopup('')">{{username}}</div>
                    </div>
                </div>
                <div class="login_and_signup">
                    <div class="exit" @click="exit">退出</div>
                    <div @click="showOnlineChat" class="online_open"><img src="@/assets/liveChat.png" /></div>
                </div>
            </div>
        </div>

        <div class="personal_popup contain_1200">
            <div class="personal_popup_nav">
                <div class="nav_item" v-for="item in personalNavList" :key="'person' + item.id" :class="{'cur': personalNavCur == item.id}" @click="toThisPopupRoute(item.name, item.id)">{{item.title}}</div>
            </div>
            <div class="person_popup_contain">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            username: "",
            ifShowHelpDetail: false,
            personalNavCur: 0,
            personalNavList: [
                {
                    id: 0,
                    name: 'aMsg',
                    title: '代理商信息'
                },{
                    id: 1,
                    name: 'aVip',
                    title: '下线会员数'
                },{
                    id: 2,
                    name: 'aBonus',
                    title: '佣金'
                },{
                    id: 3,
                    name: 'aExtent',
                    title: '推广方式 '
                },
            ],
        };
    },
    mounted() {
        this.$router.push('/aMsg');



        let msg = localStorage.getItem('agentData') ? JSON.parse(localStorage.getItem('agentData')) : {};
        
        this.username = msg.agentCode;
    },  
    methods: {
        returnToIndex() {
        },
        openPopup() {

        },
        exit() {
            localStorage.removeItem(`agentToken`);
            sessionStorage.removeItem(`agentToken`);
            localStorage.removeItem(`agentData`);
            sessionStorage.removeItem(`agentData`);
            this.$router.push(`/`);
        },
        toThisPopupRoute(name, index) {
            this.$router.push(`/${name}`);
            this.personalNavCur = index;
        },
        showOnlineChat() {
            document.querySelector(`#ukefu-point`).style.visibility = `visible`;
        }
    }
}
</script>

<style lang='less' scoped>
.index_header {
    height: 100px;
    display: flex;
    justify-content: space-between;
    .captcha_img {
        width: 172px;
        height: 38px;
        border: 1px solid transparent;
        border-radius: 4px;
        margin-top: 10px;
    }
    .logo_box {
        width: 200px;
        height: 100%;
        padding: 15px 0;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .controlls_box {
        display: flex;
        color: #50576C;
        font-size: 16px;
        .controlls_input {
            width: 172px;
            height: 38px;
            border: 1px solid rgba(48,53,79,1);
            margin-right: 20px;
            margin-top: 10px;
            color: #50576C; 
            .captcha {
                width: 172px;
                height: 38px;
                border: 1px solid #30354f;
                margin-right: 20px;
                margin-top: 10px;
                color: #50576C;
            }
            input {
                background-color: transparent;
                border: none;
                width: 100%;
                height: 100%;
                text-align: left;
                padding-left: 10px;
                &::-webkit-input-placeholder {
                    font-size: 14px;
                }
            }

        }
        
        .login_and_signup {
            display: flex;
            margin-left: 16px;
            margin-top: 20px;
            position: relative;
            cursor: pointer;
            .login {
                color: rgba(255,216,165,1);
                padding: 0 16px;
                margin-right: 4px;
                position: relative;
                &::after {
                    content: "";
                    width: 2px;
                    height: 20px;
                    background-color: rgba(99, 104, 135, 1);
                    position: absolute;
                    right: -4px;
                    top: 50%;
                    transform: translateY(-50%)
                }
                &:hover {
                    background-color: rgba(99, 104, 135, .3);
                }
            }
            .signup {
                padding: 0 16px;
                &:hover {
                    background-color: rgba(99, 104, 135, .3);
                }
            }
            .forget_psw {
                position: absolute;
                text-decoration: underline;
                color: rgba(85, 111, 183, 1);
                margin-top: 16px;
                padding: 0 5px;
                text-align: center;
                cursor: pointer;
                top: 30px;
                left: -4px;
                font-size: 12px;
                &:hover {
                    background-color: rgba(99, 104, 135, .3);
                }
            }
            .online_open {
                position: absolute;
                top: 0;
                left: 70px;
                font-size: 12px;
                img {
                    width: 60px;
                    height: 100%;
                }
            }
            .exit {
                margin-right: 26px;
                padding-right: 26px;
                position: relative;
                color: #7e869c;
                /* &::after {
                    content: "";
                    width: 2px;
                    height: 20px;
                    background-color: rgba(99,104,135,1);
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%)
                } */
            }
            .email {
                position: relative;
                color: #7e869c;
                .unread {
                    position: absolute;
                    top: 0;
                    right: -16px;
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    border-radius: 50%;
                    background-color: #f32626;
                    color: #fff;
                    font-size: 14px;
                }
                background-color: transparent;
            }
        }
        
        .controlls_item_left {
            text-align: center;
            margin-top: 20px;
            cursor: pointer;
            .controlls_item_top {
                overflow: hidden;
                div {
                    float: right;
                    min-width: 130px;
                    text-align: center;
                }
                .username {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 24px;
                    color: #7e869c;
                    vertical-align: middle;
                }
                .user_count {
                    text-decoration: underline;
                    color: #7e869c;
                }
            }
            .controlls_item_bottom {
                .ele_with_border {
                    float: right;
                    border: 1px solid rgba(48,53,79,1);
                    border-radius: 4px;
                    color: #ffd8a5;
                    margin-top: 10px;
                    height: 38px;
                    line-height: 38px;
                    width: 130px;
                    margin-left: 10px;
                    &.money {
                        text-decoration: underline;
                        position: relative;
                        .money_detail {
                            position: absolute;
                            z-index: 1995;
                            color: #C7AB90;
                            font-size: 18px;
                            left: 50%;
                            transform: translateX(-50%);
                            background-color: rgba(48, 53, 79, .8);
                            .money_detail_item {
                                padding: 0 10px;
                                height: 30px;
                                line-height: 30px;
                                width: 170px;
                                border: 1px solid rgba(48,53,79,1);
                                text-align: left;
                                padding-left: 4px;
                                margin-bottom: 4px;
                                &:last-child {
                                    margin: 0;
                                }
                            }
                        }
                    }
                }
            }
        }

        .signup {
            color:rgba(226,148,113,1);
        }
    }
}

.personal_popup {
    .personal_popup_nav {
        display: flex;
        border-top: 1px solid #232433;
        .nav_item {
            width: calc(100% / 4);
            height: 66px;
            background-color: #131422;
            text-align: center;
            line-height: 66px;
            font-size: 18px;
            color: #FDD6A3;
            cursor: pointer;
            &.cur {
                background-color: #040304;
            }
        }
    }
    .person_popup_contain {
        min-height: 80vh;
        overflow-y: auto;
        background-image: url(/assets/bg.png);
        background-size: 100%;
    }
    .close_popup {
        position: absolute;
        top: 10px;
        right: 10px;
        color: #fff;
        cursor: pointer;
    }
}
</style>