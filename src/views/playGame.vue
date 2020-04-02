<!-- 玩游戏 playGame -->
<template>
    <div class="play_game_box" id="completeDiv">
        <header>
            <div class="contain_1200">
                <div class="logo_box" @click="returnToIndex">
                    <img src="@/assets/logo.png" alt="" class="logo_img">
                </div>
                <div class="nav_list_box">
                    <div class="nav_item" v-for="(item, index) in navList" :key="'nav1' + index" @click="changeCur(index, false)" :class="{cur: curNav == index}">
                        <div>{{item}}</div>
                    </div>
                </div>
            </div>
        </header>
        <iframe id="google_ads_frame2" name="google_ads_frame2" width="100%" :height="minH" frameborder="0" :src="gameSrc" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="auto" allowfullscreen="true"></iframe>
        <div class="shade" v-show="ifShowShade" :style="{height: '100vh'}"></div>
        <div id="circle_loading" v-if="ifShowLoading"></div>

        <!-- 个人中心弹弹窗 -->
        <transition name="fade">
            <div class="personal_popup" v-show="ifShowPopup">
                <div class="personal_popup_nav">
                    <div class="nav_item" v-for="item in personalNavList" :key="'person' + item.id" :class="{'cur': personalNavCur == item.id}" @click="toThisPopupRoute(item.name, item.id)">{{item.title}}</div>
                </div>
                <div class="person_popup_contain">
                    <router-view />
                </div>
                <div class="close_popup" @click="closePopup">×</div>
            </div>
        </transition>

    </div>
</template>

<script>
import { ajaxPost, ajaxGet } from '@/common/js/public'
import { apiUrl } from '@/common/js/api'

export default {
    data () {
        return {
            originUrl: ``,
            gameSrc: '',
            minH: '',
            clientH: 0,
            id: '',
            sessionId: '',
            ifShowShade: false,
            ifShowLoading: false,
            curNav: -1,
            navList: ['账户名称', '账户余额', '未结算余额', '充值', '提现', '金币互转', '游戏记录', '联系客服'],
            personalNavList: [
                {
                    id: 0,
                    name: 'gBank',
                    title: '银行'
                }, {
                    id: 1,
                    name: 'gAccount',
                    title: '账户',
                }, {
                    id: 2,
                    name: 'gHistory',
                    title: '游戏记录'
                },
            ],
            personalNavCur: 0, //个人中心导航索引
            ifShowPopup: false, //个人中心弹窗
        };
    },
    created() {
        this.originUrl = window.location.href;
        
        let query = this.$route.query;
        let session = JSON.parse(sessionStorage.getItem('gameData'));
        this.gameSrc = query.src || session.src;
        this.sessionId = query.sessionId || session.sessionId;
        if (!/http/.test(query.src)) {
            this.gameSrc = `http://${query.src}`;
        }
        this.minH = query.height || session.height;
        this.id = query.id || session.id;

    },
    mounted() {
        this.ifShowShade = true;
        this.ifShowLoading = true;

        setTimeout(() => {
            this.ifShowShade = false;
            this.ifShowLoading = false;
        }, 3000);
        
        const _this = this;
        function logoutGameAsyncFalse() {
                var oAjax = new XMLHttpRequest();

                oAjax.open('GET', `${apiUrl.logoutGame}${_this.id}?sessionId=${_this.sessionId}`, false);//false表示同步请求
                let token = localStorage.getItem('token') || sessionStorage.getItem('token');
                oAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                oAjax.setRequestHeader("appToken", token);

                oAjax.onreadystatechange = function() {
                    if (oAjax.readyState == 4 && oAjax.status == 200) {
                    }
                };

                oAjax.send();
        }

        window.addEventListener('unload', logoutGameAsyncFalse);
    },
    beforeDestroy() {
        this.logoutGame();
    },
    methods: {
        logoutGame() {
            ajaxGet(`${apiUrl.logoutGame}${this.id}?sessionId=${this.sessionId}`, {}, res => {
                console.log('logout===', res);
            })
        },
        returnToIndex() {
            //回到主页
            this.$router.push('/');
        },
        changeCur(idx) {
            this.curNav = idx;
            //flag为true时，请求其他的
                switch (idx) {
                    case 0:
                        this.openPopup('gAccount', 1);
                        break;
                    case 1:
                        this.openPopup('gAccount', 1);
                        break;
                    case 2:
                        this.openPopup('gAccount', 1);
                        break;
                    case 3: 
                        this.openPopup('gBank?id=0', 0);
                        break;
                    case 4:
                        this.openPopup('gBank?id=3', 0);
                        break;
                    case 5:
                        this.openPopup('gBank?id=2', 0);
                        break;
                    case 6:
                        this.openPopup('gHistory', 2);
                        break;
                    case 7:
                        //联系客服
                        document.querySelector(`#ukefu-point`).style.visibility = `visible`;
                        this.curNav = -1;
                        break;
                }
        },
        openPopup(name, id) {
            this.toThisPopupRoute(name, id);
            this.ifShowPopup = true;
            this.ifShowShade = true;
        },
        toThisPopupRoute(name, id) {
            this.$router.push(`/${name}`);
            this.personalNavCur = id
        },
        closePopup() {
            //关闭弹窗
            //this.$router.push(`${this.originUrl}`);
            this.ifShowPopup = false;
            this.curNav = -1,
            this.canMove();
            this.ifShowShade = false;
        },
        canMove() {
            document.body.style.overflow = '';
            document.removeEventListener("touchmove", e => {
                e.preventDefault();
            }, false);
        },
    }
}

</script>
<style lang='less' scoped>
header {
    height: 80px;
    background-color: #191b2b;
    .contain_1200 {
        display: flex;
        justify-content: space-between;
    }
   
    .logo_box {
        width: 200px;
        height: 100%;
        padding: 15px 0;
        overflow: hidden;
        flex-shrink: 0;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .nav_list_box {
        display: flex;
        .nav_item {
            padding: 10px 0;
            height: 80px;
            width: 120px;
            color: #FFD8A5;
            text-align: center;
            cursor: pointer;
            font-size: 16px;
            border-left: 1px solid rgba(76,80,108,1);
            &:hover {
                color: rgba(120, 197, 251, 1);
            }
            &:first-child {
                border-left: none;
            }
            div {
                margin: 10px 0;
                line-height: 40px;
            }
            &.cur {
                background-color: #101019;
                border-bottom: 2px solid #ffd8a5;
            }
            &.nav_item_fixed {
                border: none;
                &.cur {
                    border: none;
                    background-image: url(../assets/nav_special.png);
                    background-color: #191b2b;
                    background-size: 100%;
                    background-position-y: -5px;
                }
            }
        }
    }
}

.shade {
    background-color: rgba(0, 0, 0, .7);
    width: 100%;
    z-index: 1992;
    position: fixed;
    top: 0;
}

#circle_loading {
    margin: 20px auto;
    width: 100px;
    height: 100px;
    border: 5px white solid;
    border-left-color: #ff5500;
    border-right-color:#0c80fe;
    border-radius: 100%;
    animation: loading 1s infinite linear;
    position: fixed;
    top: 50%;
    right: 50%;
    transform: translate(-50%, -50%);
    z-index: 99999999;
}

@keyframes loading {
    from {
        transform: rotate(0deg)
    }
    to {
        transform: rotate(360deg)
    }
}

.personal_popup {
    position: fixed;
    top: 10%;
    left: 50%;
    z-index: 1994;
    transform: translateX(-50%);
    max-width: 1200px;
    min-width: 1000px;
    width: 80%;
    .personal_popup_nav {
        display: flex;
        border-top: 1px solid #232433;
        background-color: #131422;
        .nav_item {
            width: calc(100% / 6);
            height: 66px;
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
        height: 80vh;
        max-height: 860px;
        overflow-y: auto;
        background-image: url(../assets/bg.png);
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

.fade-enter-active, .fade-leave-active {
    transition: opacity .4s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}

.shade {
    background-color: rgba(0, 0, 0, .7);
    width: 100%;
    z-index: 1992;
    position: fixed;
    top: 0;
}
</style>