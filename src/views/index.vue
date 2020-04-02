<!-- index -->
<template>
    <div class="index" @click="globalClick">
        <div class="index_header contain_1200">
            <div class="logo_box" @click="returnToIndex">
                <img src="@/assets/logo.png" alt="" class="logo_img">
            </div>
            <div class="controlls_box" v-if="!ifLogin">
                <div class="controlls_lock"></div>
                <div class="controlls_input">
                    <input type="text" v-model="username" :placeholder="userNamePlaceHolder" @focus="() => {userNamePlaceHolder = ''}" @blur="() => {userNamePlaceHolder = '用户名或手机号'}">
                    <img class="captcha_img" :src="captchaPath" @click="getCaptcha()" alt="">
                </div>
                <div class="controlls_input">
                    <input type="password" v-model="password" :placeholder="passwordPlaceHolder" @focus="() => {passwordPlaceHolder = ''}" @blur="() => {passwordPlaceHolder = '密码'}">
                    <input type="text" class="captcha" v-model="captcha" :placeholder="captchaPlaceHolder"  @keyup.enter="login" @focus="() => {captchaPlaceHolder = ''}" @blur="() => {captchaPlaceHolder = '验证码'}">
                </div>
                <div class="login_and_signup">
                    <div class="login" @click.stop="login">登录</div>
                    <div class="signup" @click.stop="() => {signup.isShow = true;}">注册</div>
                    <div class="forget_psw" @click="() => {showMsgBox('请联系客服</br>电话：400900879')}">忘记密码</div>
                    <div @click="() => {ifShowHelpDetail = true}" class="online_open"><img src="@/assets/liveChat.png" /></div> 
                </div>
            </div>
            <div class="controlls_box" v-else>
                <div class="controlls_item_left">
                    <div class="controlls_item_top">
                        <div class="user_count" @click="openPopup('')">我的账户</div>
                        <div class="username" @click="openPopup('')">{{username}}</div>
                    </div>
                    <div class="controlls_item_bottom">
                        <div class="ele_with_border money">
                            <div @mouseover.stop="() => {ifShowMoneyDetail = true}" @mouseout.stop="() => {ifShowMoneyDetail = false}">余额：{{totalMoney}}</div>
                            <div class="money_detail" v-show="ifShowMoneyDetail" @mouseover.stop="() => {ifShowMoneyDetail = true}" @mouseout.stop="() => {ifShowMoneyDetail = false}">
                                <div class="money_detail_item" v-if="moneyList.length == 0">无</div>
                                <div class="money_detail_item" v-for="item in moneyList" :key="'money' + item.id">{{item.walletName}}: {{item.unusedCoin}}</div>
                                <div style="color: rgb(246,82,39); cursor: pointer;" @click="refreshQb">实时刷新</div>
                            </div>
                        </div>
                        <div class="ele_with_border" @click="toBank">银行</div>
                    </div>
                </div>
                <div class="login_and_signup">
                    <div class="exit" @click="exit">退出</div>
                    <el-badge :value="emailUnread">
                        <div class="email" @click="toMail">站内信</div>
                    </el-badge>
                    <div @click="() => {ifShowHelpDetail = true}" class="online_open"><img src="@/assets/liveChat.png" /></div>
                </div>
            </div>
        </div>
        <!-- 轮播图 -->
        <div class="carousel_box" @mouseout="() => {noticeBar.ifShow = false}">
            <div class="notice_bar" @mousemove="changeNoticeDetail">
                <transition name="slide">
                    <p class="notice_bar_item no_break" :key="noticeBarText.id">{{noticeBarText.val}}</p>
                </transition>
            </div>
            <div class="all_notice" @mouseout="() => {noticeBar.ifShow = false}" @mousemove="() => {noticeBar.ifShow = true}" v-if="noticeBar.ifShow">
                <transition name="fade">
                    <div class="notice_detail" v-html="noticeBar.nowDetail"></div>
                </transition>
            </div>
            <el-carousel height="350px">
                <el-carousel-item v-for="item in bannerImgList" :key="'banner' + item.id">
                    <img :src="item.url" class="banner_img">
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="main_contain">
            <!-- 主导航 -->
            <div class="main_nav" :class="{'p_top': overNavOffsetTop}">
                <div class="contain_1200">
                    <div class="nav_item" @click="changeCur(13, true)" :class="{cur: curNav == 13}"><div>我的</div></div>
                    <div class="nav_item" v-for="(item, index) in navList" :key="'nav1' + item.id" @click="changeCur(index, false, item.id)" :class="{cur: curNav == index}">
                        <div>{{item.name}}</div>
                    </div>
                    <div class="nav_item nav_item_fixed" @click="changeCur(10, true)" :class="{cur: curNav == 10}"><div>VIP</div></div>
                    <div class="nav_item nav_item_fixed" @click="changeCur(11, true)" :class="{cur: curNav == 11}"><div>优惠活动</div></div>
                    <div class="nav_item nav_item_fixed" @click="changeCur(12, true)" :class="{cur: curNav == 12}"><div>下载中心</div></div>
                </div>
            </div>
            <div class="classify_detail contain_1200" v-if="curNav < 10">
                <!-- 副导航 -->
                <div class="nav_classify_box">
                    <div class="top_box">
                        <div class="nav" :class="{'p_top': overNavOffsetTop}">
                            <div v-for="(item, idx) in navListSm" :key="'nav2' + item.id" class="nav_item" @click="toThisNavSm(item.id); changeCurSm(idx)" :class="{cur: curNavSm == idx}">
                                <img src="@/assets/nav_sm_icon.png" class="nav_sm_icon" v-show="curNavSm == idx">{{item.name}}
                            </div>
                        </div>
                        <div class="nav_holder" v-show="overNavOffsetTop"></div> 
                        <div class="contain">
                            <!-- 鼠标移入加gif，移除换回图 -->
                            <div v-for="(item, index) in containListSm" :key="'nav3' + item.id" class="contain_item" @click="getGameUrl(item.id)" @mouseenter.stop="changeGif(item.id, item.gifUrl)" @mouseleave.stop="changeImg(item.id)" :class="{'contain_item_over': item.ifMouseOver}">
                                <div class="contain_img">
                                    <img :src="item.src">
                                </div>
                                <div class="contain_title"><span v-if="!item.ifMouseOver">{{item.gameName}}</span><span v-else class="hover_item">进入游戏<i class="el-icon-right" style="border: 1px solid #959DB4; border-radius: 50%; padding: 2px; margin-left: 5px;"></i><img class="like_it" :src="!item.likeFlag ? require('@/assets/heart_default.png') : require('@/assets/heart_choose.png')" @click.stop="likeIt(index, item.id)" /></span></div>
                            </div>
                        </div>
                    </div>
                </div> 
                <!-- 宣传内容，可修改 -->
                <div class="propagate_box">
                    <div class="propagate_item">
                        <div class="item_title_box">
                            <div><img src="@/assets/index_bottom_1.png" alt="" ></div>
                        </div>
                        <div class="item_contain_box">
                            <titleMsg class="item_contain" style="font-size: 16px;" :title="'赢利简介'" :value="'赢利为最有实力的娱乐平台，制定个人信息保密制度，并设置多项安全措施。\r\n\r\n\r\n\r\n '"></titleMsg>
                            <titleMsg class="item_contain" style="font-size: 16px;"  :title="'联系我们'" :value="'如有任何问题，可通过在线、电话等联系客服。赢利 7*24全天候周到服务，客服电话：4000167333'"></titleMsg>
                        </div>
                    </div>
                    <div class="propagate_item">
                        <div class="item_title_box">
                            <div><img src="@/assets/index_bottom_2.png" alt="" ></div>
                        </div>
                        <div class="item_contain_box">
                            <titleMsg class="item_contain" style="font-size: 16px;"  :title="'游戏认证'" :value="'赢利已获得菲律宾 North Cagayan 授权，并获得英国政府博彩委员会 Gambling Commission、GEOTRUST国际、AGCC、IOM以及TST的认证。'"></titleMsg>
                            <titleMsg class="item_contain" style="font-size: 16px;"  :title="'支付方式'" :value="'赢利为客户提供多元且便捷充值方式，支付宝、微信支付、QQ 支付、网银、ATM 转账等。'"></titleMsg>
                        </div>
                    </div>
                    <div class="propagate_item">
                        <div class="item_title_box">
                            <div><img src="@/assets/index_bottom_3.png" alt="" ></div>
                        </div>
                        <div class="item_contain_box">
                            <img src="@/assets/qrCode.png" />
                            <p style="text-align:center; text-align: center; ">扫一扫，随时随地，畅玩无阻</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!--vip -->
            <div class="contain_1200" v-else-if="curNav == 10">
                <div style="min-height: 300px;text-align: center;margin: 25 0 15 0;">
                    <div class="propagate_box">
                        <div class="propagate_item">
                            <div class="item_title_box_vip">
                                <div class="vip_item_pic"><img src="@/assets/tubiao_xinyou.png" width="130px" alt="" ></div>
                                <div class="vip_item_pic"><img src="@/assets/tubiao_fanli.png" width="130px"   alt="" ></div>
                                <div class="vip_item_pic"><img src="@/assets/tubiao_libao.png" width="130px"  alt="" ></div>
                                <div class="vip_item_pic"><img src="@/assets/tubiao_tuoguan.png" width="130px"  alt="" ></div>
                                <div class="vip_item_pic"><img src="@/assets/tubiao_shengri.png" width="130px"  alt="" ></div>
                                <div class="vip_item_pic"><img src="@/assets/tubiao_gengduo.png" width="130px"  alt="" ></div>
                            </div>
                        </div>
                    </div>  
                </div>
                <div class="propagate_box">
                      <div><img src="@/assets/words.png" width="80%" height="90%"  alt="" ></div>
                </div>
            </div>
            
            <!-- 优惠活动 -->
            <div class="discount_detail_box contain_1200" v-if="curNav == 11">
                <div class="discount_controlls_item">
                    <div class="conditions_item">
                        <div class="item_title">活动名称：</div>
                        <input type="text" v-model="discount.actName" class="item_input" placeholder="">
                    </div>
                    <div class="search_btn" @click="searchDiscount">搜索</div>
                </div>
                <div class="discount_contain">
                    <div class="discount_contain_time_nav">
                        <div class="time_nav_all">全部</div>  
                    </div>
                    <div class="discount_contain_box">
                        <div class="contain_item" v-for="item in discount.containList" :key="'cota' + item.id">
                            <div class="item_time" v-html="formatActiveTime(item.inactiveTime)"></div>
                            <div class="item_title">{{item.actName}}</div>
                            <div class="item_detail">
                                <div class="item_img_wrap"><img :src="item.imageUrl" /></div>
                                <div :class="{'item_auto_height': item.isOpen, 'item_fix_height': !item.isOpen }" class="change_height">
                                    <div v-html="item.actContent"></div>
                                </div>
                                <div @click="changeHeight(item.id)" class="item_controll">{{item.isOpen == true ? '收起' : '展开'}}</div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>

            <!-- 下载中心 -->
            <div class="contain_1200" v-if="curNav == 12" :style="{minHeight: clientH}"></div>

            <!-- 我的 -->
            <div class="contain_1200 mine_box" v-else-if="curNav == 13" :style="{minHeight: clientH}">
                <div v-if="!ifLogin" style="font-size: 16px; margin-top: 24px;">请登录后查看我的收藏</div>
                <div v-else>
                    <div v-if="containListSm.length == 0">您还没有收藏游戏，快去游戏区看看吧</div>
                    <div class="contain" v-else>
                        <!-- 鼠标移入加gif，移除换回图 -->
                        <div v-for="(item, index) in likeGameList" :key="'nav3' + item.id" class="contain_item" @click="getGameUrl(item.id)" @mouseenter.stop="changeLikeGif(item.id, item.gifUrl)" @mouseleave.stop="changeLikeImg(item.id)" :class="{'contain_item_over': item.ifMouseOver}">
                                <div class="contain_img">
                                    <img :src="item.src">
                                </div>
                                <div class="contain_title"><span v-if="!item.ifMouseOver">{{item.gameName}}</span><span v-else class="hover_item">进入游戏<i class="el-icon-right" style="border: 1px solid #959DB4; border-radius: 50%; padding: 2px; margin-left: 5px;"></i><img class="like_it" :src="!item.likeFlag ? require('@/assets/heart_default.png') : require('@/assets/heart_choose.png')" @click.stop="cancelLikeIt(index, item.id)" /></span></div>
                            </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 在线帮助 -->
        <!-- <transition name="helpFade"> -->
        <div class="help_box_wrap" @mouseover.stop="() => {ifShowHelpDetail = true}" @mouseout.stop="() => {ifShowHelpDetail = false}" :class="{'show_more': ifShowHelpDetail}">
            <!-- <div class="help_box" v-if="ifLogin && !ifShowHelpDetail"> -->
            <div class="help_box" v-if="!ifShowHelpDetail">
                <div class="no_read" v-if="emailUnread > 0">{{emailUnread}}</div>
                <div class="title">在线帮助</div>
            </div>
            <!-- 在线帮助详细 -->
            <div class="help_detail_box">
                <div class="help_detail_with_border">
                    <div class="help_detail_item">
                        <p>客服站内信</p>
                        <div @click.stop="toMail">未读消息 <span class="red" v-if="emailUnread > 0"> ({{emailUnread}})</span></div>
                    </div>
                    <div class="help_detail_item">
                        <div @click="showOnlineHelp">
                            <img src="@/assets/kefu.png" class="kefu" :class="{'bigIcon': enlargeHelpIcon}" @mouseenter="() => {enlargeHelpIcon = true}" @mouseleave="() => {enlargeHelpIcon = false}" />
                            <p>在线客服</p>
                        </div>
                    </div>
                    <div class="help_detail_item">
                        <p>qq</p>
                        <div class="kefu_phone">客服1：84871-21947</div>
                        <div class="kefu_phone">客服2：84871-21947</div>
                    </div>
                    <div class="help_detail_item">
                        <p>微信客服</p>
                        <img src="@/assets/qrCode.png" />
                    </div>
                    <div class="help_detail_item">
                        <p>邮箱</p>
                        <div>kefu@gmail.com</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- </transition> -->

        <!-- 注册弹窗 -->
        <transition name="fade">
            <div class="signup_popup" v-if="signup.isShow">
                <div class="signup_header">
                    注册
                    <span @click.stop="() => {signup.isShow = false;}" style="font-size: 26px;">×</span>
                </div>
                <div class="signup_controll">
                    <div class="signup_item">
                        <div class="item_title">用户名：</div> 
                        <input type="text" v-model="signup.username" ref="sUserName" @blur="signupCheckUserName" placeholder="4-10位英文和数字组成"/>
                    </div>
                    <div class="signup_item">
                        <div class="item_title">密码：</div> 
                        <input type="password" v-model="signup.password" ref="sPassword" @blur="signupCheckPassword" placeholder="6-10位英文+数字组成"  autocomplete="new-password"/>
                    </div>
                    <div class="signup_item">
                        <div class="item_title">确认密码：</div> 
                        <input type="password" v-model="signup.againPassword" ref="sPasswordAgain" @blur="signupCheckPasswordAgain" autocomplete="new-password" />
                    </div>
                    <div class="signup_item">
                        <div class="item_title">手机号：</div> 
                        <input type="text" v-model="signup.phone" ref="sPhone" @blur="signupCheckPhone" />
                    </div>
                    <div class="signup_item sms_item">
                        <div class="item_title">验证码：</div> 
                        <input type="text" v-model="signup.sms">
                        <div class="send_sms" @click="getSms" :class="{'disabled': !signup.ifCanGetSms}"><span v-if="signup.ifCanGetSms">获取验证码</span><span v-if="!signup.ifCanGetSms">{{signup.countdown}}s后重发</span></div> 
                    </div>
                    <div class="signup_item">
                        <div class="item_title">邀请码：</div> 
                        <input type="text" v-model="signup.inviteCode" ref="sInvite" />
                    </div>
                    <div class="signup_item" style="color: #606266;">
                        <div class="item_title"></div> 
                        <p>还没有邀请码，现在联系客服申请</p>
                    </div>
                    <div class="agress_protocol">
                        <el-checkbox v-model="signup.agress">我同意<span class="user_protocol" @click="() => {isShowProtocol = true}">用户协议</span></el-checkbox>
                    </div>
                </div>
                <div class="submit_btn" @click="submitSignup">注&nbsp;&nbsp;册</div>
            </div>
        </transition>

        <!-- 用户协议 -->
        <transition name="fade">
            <userProtocol @closeProtocol="closeProtocol" v-if="isShowProtocol"></userProtocol>
        </transition>

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

        <!-- 公告弹窗 -->
        <transition name="fade">
            <div class="notice_popup" v-if="ifShowNotice">
                <!-- <div class="notice_img">
                    <img src="">
                </div> -->
                <div class="notice_main_contain_box">
                    <el-carousel height="300px" :autoplay="false">
                        <el-carousel-item v-for="item in noticeList" :key="'no' + item.id">
                            <div class="contain_title">{{item.messTitle}}</div>
                            <div class="contain_text" v-html="item.messContent"></div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="notice_controlls">
                    <div class="notice_btn" @click="closeNotice">关闭</div>
                    <div class="notice_btn" @click="closeNotice(true)">不再提醒</div>
                </div>
            </div>
        </transition>

        <transition name="fade">
            <div class="agent_popup" v-if="showAgent">
                <agent @closeAgent="closeAgent" @clickAgentLogin="clickAgentLogin" @clickAgentSignup="clickAgentSignup"></agent>
            </div>
        </transition>

        <!-- 代理注册 -->
        <transition name="fade">
            <div class="agent_signup_popup" v-if="showAgentSignup">
                <div class="signup_header">
                    注册
                    <span @click.stop="() => {showAgentSignup = false; ifShowShade = false;}" style="font-size: 26px;">×</span>
                </div>
                <div class="signup_controll">
                    <div class="signup_item">
                        <div class="item_title">代理账号：</div> 
                        <input type="text" v-model="agentSignup.username" placeholder="请填写数字字母组合账号"/>
                    </div>
                    <div class="signup_item">
                        <div class="item_title">邮箱地址：</div> 
                        <input type="text" v-model="agentSignup.email" placeholder="如  XXX@163.com" />
                    </div>
                    <div class="signup_item">
                        <div class="item_title">登录密码：</div> 
                        <input type="password" v-model="agentSignup.password" autocomplete="new-password" placeholder="注册密码：长度6-16位" />
                    </div>
                    <div class="signup_item">
                        <div class="item_title">真实姓名：</div> 
                        <input type="text" v-model="agentSignup.realName" placeholder="请填写真实姓名" />
                    </div>
                    <div class="signup_item">
                        <div class="item_title">手机号码：</div> 
                        <input type="text" v-model="agentSignup.mobile" placeholder="请如实填写，方便与您联系"/>
                    </div>
                    <div class="signup_item">
                        <div class="item_title">联系QQ：</div> 
                        <input type="text" v-model="agentSignup.qq" placeholder="请填写联系QQ" />
                    </div>
                </div>
                <div class="submit_btn" @click="agentSubmit">立即注册</div>
                <div class="submit_btn" @click="agentSumitToLogin">登&nbsp;&nbsp;录</div>
            </div>
        </transition>

        <!-- 代理登录 -->
        <transition name="fade">
            <div class="agent_login_popup" v-if="showAgentLogin">
                <div class="signup_header">
                    登录
                    <span @click.stop="() => {showAgentLogin = false; ifShowShade = false;}" style="font-size: 26px;">×</span>
                </div>
                <div class="signup_controll">
                    <div class="signup_item">
                        <div class="item_title">代理账号：</div> 
                        <input type="text" v-model="agentLogin.username" placeholder="请输入代理账号"/>
                    </div>
                    <div class="signup_item">
                        <div class="item_title">登录密码：</div> 
                        <input type="password" v-model="agentLogin.password" placeholder="请输入密码" />
                    </div>
                </div>
                <div class="submit_btn" @click="agentSumitToSignup">立即注册</div>
                <div class="submit_btn" @click="agentLoginSubmit">登&nbsp;&nbsp;录</div>
            </div>
        </transition>

        <div class="footer">
            <div class="contain_1200">
                <ul class="link_list">
                    <li @click="newWindows('privacy')">隐私政策</li>
                    <li @click="newWindows('response')">负责任博彩</li>
                    <li>联系我们</li>
                    <li @click="newWindows('about')">关于我们</li>
                    <li @click="newWindows('helpCenter')">帮助中心</li>
                    <li @click="showAgentFn">合理代营</li>
                </ul>
                <div class="copyright">CopyrightC2019版权所有</div>
            </div>
        </div>

        <!-- 遮罩 -->
        <div class="shade" v-show="ifShowShade" :style="{height: clientH}"></div>
        <div class="shadeForMsgBox" v-show="ifShowShadeForShade" :style="{height: clientH}"></div>
        <div id="circle_loading" v-if="ifShowLoading"></div>

        <msgBox v-if="isShowMsgBox" :value="msgBox" @closeMsgBox="closeMsgBox"></msgBox>
    </div>
</template>

<script>
import { ajaxPost, ajaxGet } from '@/common/js/public'
import { apiUrl } from '@/common/js/api'
import http from '@/common/js/httpRequest'
import userProtocol from '@/components/userProtocol'
import msgBox from '@/components/msgBox'
import titleMsg from '@/components/titleMsg'
import agent from './agent'

export default {
    data () {
        return {
            signup: {
                isShow: false,
                username: '',
                password: '',
                againPassword: '',
                phone: '',
                sms: '',
                agress: false,
                ifCanGetSms: true,
                countdown: 60,
                correctSms: '',
                inviteCode: '', //邀请码
            }, //注册
            agentLogin: {
                username: '',
                password: '',
            },
            agentSignup: {
                username: '',
                email: '',
                password: '',
                realName: '',
                mobile: '',
                qq: '',
            },
            showAgent: false, //代理弹窗
            showAgentSignup: false,
            showAgentLogin: false,
            clientH: 0,
            ifLogin: false, //是否登录
            username: '', //登录和登录完成后用
            userId: '',
            userNamePlaceHolder: '用户名或手机号',
            password: '',
            passwordPlaceHolder: '密码',
            uuid: '', //验证码uuid
            captchaPath: '', //验证码图片
            captcha: '', //验证码
            captchaPlaceHolder: '验证码',
            totalMoney: 0, //金币
            //emailUnread: '', //站内信未读
            bannerImgList: [], //轮播图
            curNav: 0, //主导航索引
            navList: [], //主导航
            navListSm: [], //副导航
            curNavSm: 0, //副导航索引
            containListSm: [], //副导航下内容
            moneyList: [], //钱包列表
            ifShowMoneyDetail: false, //是否显示钱包列表
            personalNavList: [
                {
                    id: 0,
                    name: 'personal',
                    title: '个人信息'
                },{
                    id: 1,
                    name: 'bank',
                    title: '银行'
                },{
                    id: 2,
                    name: 'bonus',
                    title: '奖金'
                },{
                    id: 3,
                    name: 'integral',
                    title: '积分'
                },{
                    id: 4,
                    name: 'gameHistory',
                    title: '游戏记录'
                },{
                    id: 5,
                    name: 'mail',
                    title: '站内信'
                },
            ],
            personalNavCur: 0, //个人中心导航索引
            ifShowPopup: false, //个人中心弹窗
            noticeList: [], //通知列表
            ifShowNotice: false, //通知弹窗
            discount: {
                discount: '',
                containList: [], //活动列表
                page: 1,
                limit: 10,
                flag: true, //是否还有内容
            }, //优惠页数据
            isShowProtocol: false, //用户协议
            isShowMsgBox: false,
            msgBox: '',
            noticeBar: {
                list: [],//['1 第一条公告', '2 第二条公告第二条公告', '3 第三条公告第三条公告第三条公告'], //公告栏
                number: 0,
                timer: null,
                ifShow: false,
                nowDetail: '',
                detailList: [],
            },
            ifShowShade: false, //遮罩
            ifShowShadeForShade: false, //遮罩
            ifShowHelpDetail: false, //在线帮助详情展开
            overNavOffsetTop: false, //是否把导航黏住
            enlargeHelpIcon: false,
            ifShowLoading: false,
            likeGameList: [],//我喜欢的游戏
        };
    },
    created() {

        if (localStorage.getItem('tokenExpire') > new Date().getTime() || sessionStorage.getItem('tokenExpire') > new Date().getTime()) {
            if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
                this.ifLogin = true;
                ajaxGet(apiUrl.userInfo, {}, res => {
                    if (res.code != 500) {
                        this.username = res.user.name;
                        this.userId = res.user.id;
                    }
                })
            }
        }
        
        //获取验证码
        if (!this.ifLogin) {
            this.getCaptcha(); 
        }

        if (this.ifLogin) {
            //公告
            this.getNotice();
            //弹出公告
            this.getPopupList();
            //金币
            this.getMoneyList();
            //站内信
            this.getUnreadMail();

            if (this.$route.path == '/') {
                if (localStorage.getItem('ifOpenNotice') !== 'false' || sessionStorage.getItem('ifOpenNotice') !== 'false') {
                    //打开通知弹窗
                    this.openNotice();
                }
            }
            if (this.$route.path != '/') {
                let p = this.$route.path.split('/')[1],
                    query = this.$route.query,
                    id = query.id != undefined ? query.id : 0;
                this.$router.push(`${this.$route.path}?id=${id}`);
                switch (p) {
                    case 'personal':
                        this.personalNavCur = 0;
                        break;
                    case 'bank':
                        this.personalNavCur = 1;
                        break;
                    case 'bonus':
                        this.personalNavCur = 2;
                        break;
                    case 'integral':
                        this.personalNavCur = 3;
                        break;
                    case 'gameHistory':
                        this.personalNavCur = 4;
                        break;
                    case 'mail':
                        this.personalNavCur = 5;
                        break;
                    default:
                        this.personalNavCur = 0;
                        break;
                }
                this.ifShowPopup = true;
                this.stopMove();
                this.ifShowShade = true;
            }
            
        }

        this.clientH = document.documentElement.clientHeight + 'px';

        // 获取轮播图
        ajaxGet(apiUrl.banner, {}, res => {
            this.bannerImgList = res.list;
        })

        // 获取主导航，把获取到的主导航第一个作为参数，获取副导航，再把副导航第一个作为参数，获取副导航内容
        this.getNavList();

    },
    mounted() {
        /* document.querySelector('.lim_float_icon').style.display = 'none';
        setTimeout(() => {
            document.querySelector('#lim_mini').style.display = 'none';
        }, 1000) */
        
        let navOffsetTop = document.querySelector('.main_nav').offsetTop;

        window.onscroll = () => {
            let scrollTop = document.documentElement.scrollTop||document.body.scrollTop,
                windowHeight = document.documentElement.clientHeight || document.body.clientHeight,
                scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            //滚动条到底部的条件
            if ( scrollTop + windowHeight == scrollHeight) {
                //写后台加载数据的函数
                if (this.curNav == 11) {
                    //切换到优惠活动时
                    this.getDiscountListByPage();
                }
            }

            //滚动超过navOffsetTop,吸顶
            if (this.curNav >= 10) {
                if (scrollTop >= navOffsetTop) {
                    this.overNavOffsetTop = true;
                } else {
                    this.overNavOffsetTop = false;
                }
            } else {
                if (scrollTop >= navOffsetTop && scrollTop <= document.querySelector('.contain').clientHeight + 300) {
                    this.overNavOffsetTop = true;
                } else {
                    this.overNavOffsetTop = false;
                }
            }
            
        }
    },
    computed: {
        noticeBarText() {
            return {
                id: this.noticeBar.number,
                val: this.noticeBar.list[this.noticeBar.number]
            }
        },
        emailUnread: {
            get: function() {
                return this.$store.state.aModule.emailUnread;
            },
        }
    },
    watch: {
        $route() {
            let query = this.$route.query;
            try {
                if (query.nav) {
                    this.personalNavCur = Number(query.nav);
                }
            } catch (error) {
                
            }
        },
    },
    filters: {
        filterUsername(val) {
            if (val) {
                return val.length > 6 ? val.slice(0, 6) + '...' : val;
            }
            return '';
        },
    },
    components: {msgBox, userProtocol, titleMsg, agent},
    methods: {
        returnToIndex() {
            //回到主页
            this.$router.push('/');
        },
        showOnlineHelp() {
            document.querySelector(`#ukefu-point`).style.visibility = `visible`;
        },
        getUnreadMail() {
            ajaxGet(apiUrl.mail, {
                status: 2,
                page: 1,
                limit: 100
            }, res => {
                if (res.code != 500) {
                    let emailUnread = res.page.list.length > 0 ? res.page.list.length : '';
                    this.$store.commit('aModule/changeNoReadMailData', emailUnread)
                }
            })
        },
        formatActiveTime(val) {
            let t = val.split(' ')[0].split('-');
            return `${t[0]}</br>${t[1]}-${t[2]}`;
        },
        getGameUrl(id) {
            if(this.ifLogin) {
                this.ifShowShade = true;
                this.ifShowLoading = true;
                //进入游戏
                ajaxGet(`${apiUrl.getGameUrl}${id}`, {}, res => {
                    if (res.code != 500) {
                        this.ifShowShade = false;
                        this.ifShowLoading = false;
                        let query = {
                            src: res.data,
                            id: id,
                            height: document.documentElement.clientHeight,
                            sessionId: res.sessionId
                        };
                        sessionStorage.setItem('gameData', JSON.stringify(query));
                        const { href } = this.$router.resolve({
                            name: "playGame",
                            query: query,
                        });
                        window.open(href, '_blank');
                    } else {
                        this.ifShowShade = false;
                        this.ifShowLoading = false;
                        this.showMsgBox(res.msg);
                    }
                })
            } else {
                this.showMsgBox('请先登录');
            }
        },
        changeGif(id, gif) {
            for (let i=0; i<this.containListSm.length; i++) {
                if (this.containListSm[i].id == id) {
                    try {
                        let newArr = this.containListSm[i];
                        if (newArr.gifUrl != null) {
                            newArr.src = newArr.gifUrl;
                        }
                        newArr.ifMouseOver = true;
                        this.containListSm.splice(i, 1, newArr);
                        throw Error('break loop;;');
                    } catch (error) {
                        
                    }
                }
            }
        },
        changeImg(id) {
            for (let i=0; i<this.containListSm.length; i++) {
                if (this.containListSm[i].id == id) {
                    try {
                        let newArr = this.containListSm[i];
                        newArr.src = newArr.mainImageUrl;
                        newArr.ifMouseOver = false;
                        this.containListSm.splice(i, 1, newArr);
                        throw Error('break loop;;');
                    } catch (error) {
                        
                    }
                }
            }
        },
        changeLikeGif(id, gif) {
            for (let i=0; i<this.likeGameList.length; i++) {
                if (this.likeGameList[i].id == id) {
                    try {
                        let newArr = this.likeGameList[i];
                        if (newArr.gifUrl != null) {
                            newArr.src = newArr.gifUrl;
                        }
                        newArr.ifMouseOver = true;
                        this.likeGameList.splice(i, 1, newArr);
                        throw Error('break loop;;');
                    } catch (error) {
                        
                    }
                }
            }
        },
        changeLikeImg(id) {
            for (let i=0; i<this.likeGameList.length; i++) {
                if (this.likeGameList[i].id == id) {
                    try {
                        let newArr = this.likeGameList[i];
                        newArr.src = newArr.mainImageUrl;
                        newArr.ifMouseOver = false;
                        this.likeGameList.splice(i, 1, newArr);
                        throw Error('break loop;;');
                    } catch (error) {
                        
                    }
                }
            }
        },
        likeIt(index, id) {
            if (this.ifLogin) {
                    let c = this.containListSm[index],
                    flag = c.likeFlag,
                    url = '';

                //请求
                if (flag) {
                    //喜欢 -> 不喜欢
                    url = apiUrl.cancleFavorGame;
                } else {
                    //不喜欢 -> 喜欢
                    url = apiUrl.favorGame;
                }

                ajaxGet(url, {
                    gameId: id
                }, res => {
                    if (res.code != 500) {
                        c.likeFlag = !c.likeFlag;
                        this.containListSm.splice(index, 1, c);
                    }
                })
            } else {
                this.showMsgBox(`请先登录`);
            }
        },  
        cancelLikeIt(index, id) {
            ajaxGet(apiUrl.cancleFavorGame, {
                gameId: id
            }, res => {
                if (res.code != 500) {
                    this.likeGameList.splice(index, 1);
                }
            })
        },
        // 获取验证码
        getCaptcha() {
            this.uuid = this.getUUID()
            this.captchaPath = http.adornUrl(`${apiUrl.baseURL}/captcha.jpg?uuid=${this.uuid}`);
            this.captcha = '';
        },
        getUUID() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
            })
        },
        changeHeight(id) {
            for (let i=0; i<this.discount.containList.length; i++) {
                if (this.discount.containList[i].id == id) {
                    try {
                        let newArr = this.discount.containList[i];
                        newArr.isOpen = !newArr.isOpen;
                        this.discount.containList.splice(i, 1, newArr);
                        throw Error('break loop;;');
                    } catch (error) {
                        
                    }
                }
            }
        },
        getMoneyList() {
            //各账户金币数
            ajaxGet(apiUrl.getWalletCoin, {}, res => {
                if (res.code != 500) {
                    this.moneyList = res.acctInfoDto.acctInfoList;
                    this.totalMoney = res.acctInfoDto.totalCoin;
                    for (let i=0; i<this.moneyList.length; i++) {
                        try {
                            if (this.moneyList[i].mainFlag == 1) {
                                this.moneyList[i].walletName = '中心钱包';
                                throw Error('break loop;;');
                            }
                        } catch (error) {
                            
                        }
                    }
                }
            })
        },
        startMove () {
            //公告滚动
            if (this.noticeBar.list.length > 1) {
                this.noticeBar.timer = setTimeout(() => {
                    if (this.noticeBar.number === this.noticeBar.list.length - 1) {
                        this.noticeBar.number = 0;
                    } else {
                        this.noticeBar.number += 1;
                    }
                    this.startMove();
                }, 2000); // 滚动不需要停顿则将2000改成动画持续时间
            }
        },
        getNotice() {
            ajaxGet(apiUrl.notice, {}, res => {
                if (res.code != 500) {
                    for (let i=0; i<res.list.length; i++) {
                        this.noticeBar.list.push(`${res.list[i].messTitle}`);
                        this.noticeBar.detailList.push(`${res.list[i].messContent}`);
                    }
                }
                this.startMove();
            })
        },
        changeNoticeDetail() {
            this.noticeBar.nowDetail = this.noticeBar.detailList[this.noticeBar.number];
            this.noticeBar.ifShow = true;
        },
        stopMove() {
            clearTimeout(this.noticeBar.timer);
        },
        globalClick() {
            this.ifShowMoneyDetail = false;
            //this.ifShowHelpDetail = false;
        },
        login() {
            if (this.username == '') {
                //提示输入用户名
                this.showMsgBox('请输入用户名');
                return false;
            }
            if (this.password == '') {
                //提示输入密码
                this.showMsgBox('请输入密码');
                return false;
            }
            if (this.captcha == '') {
                //提示输入密码
                this.showMsgBox('请输入验证码');
                return false;
            }
            ajaxPost(apiUrl.login, {
                userCode: this.username,
                password: this.password,
                code: this.captcha,
                uuid: this.uuid,
            }, res => {
                if (res.code == 500) {
                    //提示密码错误
                    this.getCaptcha();
                    this.showMsgBox(res.msg);
                    return false;
                }
                //登录成功，切换状态，存一堆东西
                /* this.showMsgBox('登录成功'); */
                localStorage.setItem('token', res.token);
                sessionStorage.setItem('token', res.token);
                let expire = new Date().getTime() + res.expire * 1000;
                localStorage.setItem('tokenExpire', expire);
                sessionStorage.setItem('tokenExpire', expire);
                /* setTimeout(() => { */
                    //this.ifLogin = true;
                    window.location.reload();
                /* }, 3000) */
                //公告
                this.getNotice();
            })
        },
        showMsgBox(val) {
            this.isShowMsgBox = true;
            this.msgBox = val;
            this.ifShowShadeForShade = true;
        },
        closeMsgBox() {
            this.isShowMsgBox = false;
            this.ifShowShadeForShade = false;
        },
        signupCheckUserName() {
            if (!this.signup.username) {
                this.showMsgBox('用户名不能为空');
                //this.$refs.sUserName.focus();
                return false;
            }
            let reg = /^[A-Za-z0-9]{4,11}$/;
            if (!reg.test(this.signup.username)) {
                //提示用户名不合理
                this.showMsgBox('用户名不合理');
                //this.$refs.sUserName.focus();
                return false;
            }
        },
        signupCheckPassword() {
            if (!this.signup.password) {
                this.showMsgBox('密码不能为空');
                //this.$refs.sPassword.focus();
                return false;
            }
            let preg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/;
            if (!preg.test(this.signup.password)) {
                //提示密码不合理
                this.showMsgBox('密码不合理');
                //this.$refs.sPassword.focus();
                return false;
            }
        },
        signupCheckPasswordAgain() {
            if (this.signup.password !== this.signup.againPassword) {
                //提示两次密码不一致
                this.showMsgBox('两次密码不一致');
                //this.$refs.sPasswordAgain.focus();
                return false;
            }
        },
        signupCheckPhone() {
            let reg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
            if (this.signup.phone.length == 0) {
                //提示手机号为空
                this.showMsgBox('请输入手机号');
                //this.$refs.sPhone.focus();
                return false;
            } else {
                if (!reg.test(this.signup.phone)) {
                    //提示手机号不正确
                    this.showMsgBox('请输入正确的手机号');
                    //this.$refs.sPhone.focus();
                    return false;
                }
            }
        },
        submitSignup() {
            //注册
            if (!this.signup.username || !this.signup.password || !this.signup.phone || !this.signup.sms) {
                //提示完成填写
                this.showMsgBox('完成填写');
                return false;
            }
            let reg = /^[A-Za-z0-9]{4,11}$/;
            if (!reg.test(this.signup.username)) {
                //提示用户名不合理
                this.showMsgBox('用户名不合理');
                return false;
            }
            let preg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/;
            if (!preg.test(this.signup.password)) {
                //提示密码不合理
                this.showMsgBox('密码不合理');
                return false;
            }
            if (this.signup.password !== this.signup.againPassword) {
                //提示两次密码不一致
                this.showMsgBox('两次密码不一致');
                return false;
            }
            if (!this.signup.agress) {
                //提示同意用户协议
                this.showMsgBox('必须同意用户协议');
                return false;
            }
            ajaxPost(apiUrl.register, {
                username: this.signup.username,
                password: this.signup.password,
                mobile: this.signup.phone,
                code: this.signup.sms,
                inviteCode: this.signup.inviteCode,
            }, res => {
                if (res.code == 500) {
                    this.showMsgBox(res.msg);
                    return false;
                }
                //注册成功，自动五秒后自动登录
                this.showMsgBox('注册成功，3s后自动登录');
                localStorage.setItem('token', res.token);
                sessionStorage.setItem('token', res.token);
                let expire = new Date().getTime() + res.expire * 1000;
                localStorage.setItem('tokenExpire', expire);
                sessionStorage.setItem('tokenExpire', expire);
                //存登录标识，刷新页面
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            })
        },
        getSms() {
            if (this.signup.ifCanGetSms) {
                if (this.verticalPhone()) {
                    this.count();
                    this.signup.ifCanGetSms = false;
                    //send sms
                    ajaxGet(apiUrl.registerCode, {
                        mobile: this.signup.phone
                    }, res => {
                        this.signup.correctSms = res.sms;
                    })
                }
            }
        },
        verticalPhone() {
            let reg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
            if (this.signup.phone.length == 0) {
                //提示手机号为空
                this.showMsgBox('请输入手机号');
                return false;
            } else {
                if (!reg.test(this.signup.phone)) {
                    //提示手机号不正确
                    this.showMsgBox('请输入正确的手机号');
                    return false;
                }
            }
            return true;
        },
        count() {
            if (this.signup.countdown == 0) {
                this.signup.ifCanGetSms = true;
                this.signup.countdown = 60;
            } else {
                setTimeout(() => {
                    this.signup.countdown--;
                    this.count();
                }, 1000)
            }
        },
        exit() {
            ajaxGet(apiUrl.logout, {}, res => {})
            setTimeout(() => {
                //清空状态
                localStorage.removeItem('token');
                sessionStorage.removeItem('token');
                localStorage.removeItem('tokenExpire');
                sessionStorage.removeItem('tokenExpire');
                localStorage.removeItem('ifOpenNotice');
                sessionStorage.removeItem('ifOpenNotice');
                this.getCaptcha();
                this.username = '';
                this.password = '';
                this.captcha = '';
                this.ifLogin = false;
            }, 500);
        },
        closeProtocol() {
            //关闭用户协议
            this.isShowProtocol = false;
        },
        toThisUrl(url) {
            this.$router.push(url);
        },
        changeCur(idx, flag, id) {
            this.curNav = idx;
            //flag为true时，请求其他的
            if (flag) {
                switch (idx) {
                    case 10:
                        
                        break;
                    case 11:
                        //优惠活动
                        ajaxGet(apiUrl.act, {
                            page: 1,
                            limit: this.discount.limit,
                        }, res => {
                            if (res.code != 500) {
                                this.discount.containList = [];
                                this.discount.containList = res.page.list;
                                for (let i=0; i<this.discount.containList.length; i++) {
                                    this.discount.containList['isOpen'] = false;
                                }
                            }
                        })
                        break;
                    case 12:
                        
                        break;
                    case 13: 
                        //我的
                        this.getLikeGameList();
                        break;
                }
            } else {
                //flag为false时，请求下面带导航的内容
                this.getNavListSm(id);
            }
        },
        getDiscountListByPage() {
            //请求优惠活动带分页>1
            if (this.discount.flag) {
                this.discount.page += 1;
                ajaxGet(apiUrl.act, {
                    page: this.discount.page,
                    limit: this.discount.limit,
                    actName: this.discount.actName
                }, res => {
                    if (res.code != 500) {
                        if (res.page.list.length == 0) {
                            this.discount.flag = false;
                            return false;
                        }
                        this.discount.containList.push(res.page.list);
                        for (let i=0; i<this.discount.containList.length; i++) {
                            let t = this.discount.containList[i].inactiveTime.split(' ')[0].split('-');
                            this.discount.containList[i].inactiveTime = `${t[0]}</br>${t[1]}-${t[2]}`;
                            this.discount.containList['isOpen'] = false;
                        }
                    }
                })
            }
        },
        getNavList() {
            //主导航
            ajaxGet(apiUrl.firstCat, {}, res => {
                this.navList = res.list;
                this.getNavListSm(this.navList[0]['id']);
            })
        },
        getNavListSm(id) {
            //副导航信息
            ajaxGet(apiUrl.secondList, {
                firstCatId: id
            }, res => {
                this.navListSm = res.list;
                this.curNavSm = 0;
                this.getContainListSm(this.navListSm[0]['id']);
            })
        },
        getContainListSm(id) {
            //副导航下信息
            ajaxGet(apiUrl.gameList, {
                secondCatId: id,
                limit: 500,
                page: 1,
                userId: this.userId ? this.userId : undefined,
            }, res => {
                this.containListSm = res.page.list;
                for (let i=0; i<this.containListSm.length; i++) {
                    this.containListSm[i].src = this.containListSm[i].mainImageUrl;
                    this.containListSm[i].ifMouseOver = false;
                    this.containListSm[i].likeFlag = this.containListSm[i].favorFlag == 1 ? true : false;
                }
            })
        },
        getLikeGameList() {
            if (this.ifLogin) {
                //获取我喜欢的游戏
                ajaxGet(apiUrl.getFavorGame, {
                    userId: this.userId,
                    limit: 500,
                    page: 1,
                }, res => {
                    this.likeGameList = res.page.list;
                    for (let i=0; i<this.likeGameList.length; i++) {
                        this.likeGameList[i].src = this.likeGameList[i].mainImageUrl;
                        this.likeGameList[i].ifMouseOver = false;
                        this.likeGameList[i].likeFlag = true;
                    }
                })
            }
        },
        toAccount() {
            //去我的账户
            this.openPopup('bank', 1);
        },
        toBank() {
            //去银行
            this.openPopup('bank', 1);
        },
        toMail() {
            if (this.ifLogin) {
                //去站内信
                this.ifShowHelpDetail = false; //关掉在线帮助
                this.openPopup('mail', 5);
            }
        },
        toThisNavSm(id) {
            this.getContainListSm(id)
        },
        changeCurSm(idx) {
            this.curNavSm = idx;
        },
        searchDiscount() {
            //搜索优惠活动
            this.discount.page = 1;
            this.discount.flag = true;
            ajaxGet(apiUrl.act, {
                page: this.discount.page,
                limit: this.discount.limit,
                actName: this.discount.actName,
            }, res => {
                this.discount.containList = res.page.list;
            })
        },
        getPopupList() {
            //获取公告弹窗
            ajaxGet(apiUrl.getPopup, {
            }, res => {
                if (res.code != 500) {
                    this.noticeList = res.list;
                }
            })
        },
        closePopup() {
            //关闭弹窗
            this.$router.push('/');
            this.ifShowPopup = false;
            this.canMove();
            this.ifShowShade = false;
        },
        openPopup(name, id) {
            if (name != '') {
                this.$router.push(`/${name}`);
                this.personalNavCur = id;
            } else {
                this.$router.push(`/personal`);
                this.personalNavCur = 0;
            }
            this.ifShowPopup = true;
            this.stopMove();
            this.ifShowShade = true;
        },
        toThisPopupRoute(name, id) {
            this.$router.push(`/${name}`);
            this.personalNavCur = id
        },
        stopMove() {
            document.body.style.overflow = 'hidden';
            document.addEventListener("touchmove", e => {
                e.preventDefault();
            }, false);
        },
        canMove() {
            document.body.style.overflow = '';
            document.removeEventListener("touchmove", e => {
                e.preventDefault();
            }, false);
        },
        openNotice() {
            this.ifShowNotice = true;
            this.ifShowShade = true;
        },
        closeNotice(flag) {
            this.ifShowNotice = false;
            this.ifShowShade = false;

            if (flag) {
                //flag 为true时不再弹出
                localStorage.setItem('ifOpenNotice', 'false');
                sessionStorage.setItem('ifOpenNotice', 'false');
            }
        },
        newWindows(path) {
            const { href } = this.$router.resolve({
                name: path,
            });
            window.open(href, '_blank');
        },
        refreshQb() {
            ajaxGet(apiUrl.freshWallet, {}, res => {
            if (res.code == 500) {
              this.showMsgBox(res.msg);
              return false;
            }
            this.getMoneyList();
          })
        },
        closeAgent() {
            this.showAgent = false;
            this.ifShowShade = false;
        },
        clickAgentLogin() {
            this.showAgentLogin = true;
            this.ifShowShade = true;
            this.showAgent = false;
        },
        clickAgentSignup() {
            this.showAgentSignup = true;
            this.ifShowShade = true;
            this.showAgent = false;
        },
        agentSubmit() {
            //代理注册
            for (let key in this.agentSignup) {
                if (!this.agentSignup[key]) {
                    this.showMsgBox('请完成信息填写');
                    return false;
                }
            }
            
            let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{2,}$/;
            if (!reg.test(this.agentSignup.username)) {
                //提示用户名不合理
                this.showMsgBox('用户名不合理');
                return false;
            }

            let mailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
            if (!mailReg.test(this.agentSignup.email)) {
                //提示邮箱不合理
                this.showMsgBox('邮箱不合理')
                return false;
            }

            let preg = /^[A-Za-z0-9]{6,10}$/;
            if (!preg.test(this.agentSignup.password)) {
                //提示密码不合理
                this.showMsgBox('密码不合理');
                return false;
            }

            let mreg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
            if (!mreg.test(this.agentSignup.mobile)) {
                //提示手机号
                this.showMsgBox('手机号不合理');
                return false;
            }

            ajaxPost(apiUrl.agentRegister, {
                username: this.agentSignup.username,
                mobile: this.agentSignup.mobile,
                password: this.agentSignup.password,
                email: this.agentSignup.email,
                realName: this.agentSignup.realName,
                qq: this.agentSignup.qq,
            }, res => {
                if (res.code != 500) {
                    //代理注册成功
                    this.showAgentSignup = false;
                    this.ifShowShade = false;
                    this.showMsgBox('注册成功');
                }
            })
        },
        agentLoginSubmit() {
            if (!this.agentLogin.username) {
                this.showMsgBox('请输入代理账号');
                return false;
            }

            if (!this.agentLogin.password) {
                this.showMsgBox('请输入密码');
                return false;
            }

            //代理登录
            ajaxPost(apiUrl.agentLogin, {
                userCode: this.agentLogin.username,
                password: this.agentLogin.password,
                code: 1,
                uuid: 1,
            }, res => {
                if (res.code != 500) {
                    //代理登录成功
                    this.showAgentLogin = false;
                    this.ifShowShade = false;
                    localStorage.setItem('agentData', JSON.stringify(res.data));
                    sessionStorage.setItem('agentData', JSON.stringify(res.data));
                    localStorage.setItem('agentToken', res.agentToken);
                    sessionStorage.setItem('agentToken', res.agentToken);
                    this.$router.push('/agent');
                    /* let expire = new Date().getTime() + res.expire * 1000;
                    localStorage.setItem('agentTokenExpire', expire);
                    sessionStorage.setItem('agentTokenExpire', expire); */
                } else {
                    this.showMsgBox(res.msg);
                }
            })
        },
        agentSumitToLogin() {
            this.showAgentSignup = false;
            this.showAgentLogin = true;
        },
        agentSumitToSignup() {
            this.showAgentSignup = true;
            this.showAgentLogin = false;
        },
        showAgentFn() {
            this.showAgent = true;
            this.ifShowShade = true;
            window.scrollTo(0, 0);
        },
    }
}

</script>
<style lang='less' scoped>
    .index {
        height: 100%;
        font-size: 18px;
        &.hidden {
            overflow: hidden;
        }
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
                    height: 38px;
                    line-height: 38px;
                    margin-top: 10px;
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
                        top: 30px;
                        left: 60px;
                        font-size: 12px;
                        margin-top: 16px;
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
                        &::after {
                            content: "";
                            width: 2px;
                            height: 20px;
                            background-color: rgba(99,104,135,1);
                            position: absolute;
                            right: 0;
                            top: 50%;
                            transform: translateY(-50%)
                        }
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
                    margin-top: 15px;
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
        .carousel_box {
            min-width: 1200px;
            position: relative;
            .banner_img {
                width: 100%;
                height: 100%;
            }

            .notice_bar {
                width: 100%;
                height: 30px;
                line-height: 30px;
                margin: 0 auto;
                overflow: hidden;
                position: absolute;
                top: 0;
                z-index: 888;
                text-align: center;
                background-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,.6), rgba(0,0,0,0));
                color: #B53132;
                font-size: 16px;
                cursor: pointer;
                .notice_bar_item {
                    width: 100%;
                    position: absolute;
                    bottom: 0;
                }
                .no_break {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    word-break: break-all;
                }
            }

            .all_notice {
                width: 100%;
                margin: 0 auto;
                position: absolute;
                top: 30px;
                z-index: 888;
                text-align: center;
                background-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,.6), rgba(0,0,0,0));
                color: #B53132;
                font-size: 16px;
                cursor: pointer;
                .notice_detail {
                    line-height: 1.5;
                }
            }
            
            .slide-enter-active, .slide-leave-active {
                transition: all 0.5s linear;
            }
            .slide-enter{
                transform: translateY(20px);
                opacity: 1;
            }
            .slide-leave-to {
                transform: translateY(-50px);
                opacity: 0;
            }
        }
        .main_contain {
            .main_nav  {
                background-color: #191b2b;
                &.p_top {
                    position: fixed;
                    top: 0;
                    width: 100%;
                    z-index: 666;
                }
                .contain_1200 {
                    display: flex;
                    .nav_item {
                        height: 50px;
                        width: 150px;
                        color: #FFD8A5;
                        text-align: center;
                        cursor: pointer;
                        border-left: 1px solid rgba(76,80,108,1);
                        &:hover {
                            color: rgba(120, 197, 251, 1);
                        }
                        &:first-child {
                            border-left: none;
                        }
                        div {
                            margin: 10px 0;
                            line-height: 30px;
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
            .discount_detail_box {
                margin-top: 32px;
                min-height: 500px;
                .discount_controlls_item {
                    display: flex;
                    align-items: center;
                    margin: 0 0 32px 32px;
                    .conditions_item {
                        display: flex;
                        font-size: 16px;
                        align-items: center;
                        justify-content: center;
                        color: #9198AC;
                        position: relative;
                        margin-right: 32px;
                        .item_title {
                            width: 100px;
                        }
                        .item_input {
                            width: 150px;
                            height: 38px;
                            line-height: 38px;
                            border: 1px solid rgba(40, 43, 58, 1);
                            border-radius: 4px;
                            padding-left: 10px;
                            background-color: transparent;
                        }
                    }
                    .search_btn {
                        color: #5D5040;
                        font-size: 16px;
                        border: 1px solid #5D5040;
                        border-radius: 4px;
                        width: 100px;
                        height: 38px;
                        line-height: 38px;
                        text-align: center;
                        cursor: pointer;
                    }
                }
              
                .discount_contain {
                    font-size: 16px;
                    display: flex;
                    height: 100%;
                    .discount_contain_time_nav {
                        width: 100px;
                        min-height: 300px;
                        position: relative;
                        .time_nav_all {
                            width: 50px;
                            height: 68px;
                            text-align: center;
                            line-height: 68px;
                            color: #9296B6;
                            background-image: url(../assets/discount_all_time.png);
                            background-size: cover;
                            position: absolute;
                            left: 50%;
                            top: 0;
                            z-index: 2;
                            transform: translate(-50%);
                        }
                        &::after {
                            height: 100%;
                            width: 5px;
                            border-radius: 5px;
                            background-color: #191B2B;
                            content: '';
                            position: absolute;
                            left: 50%;
                            top: 0;
                            transform: translate(-50%);
                        }
                    }
                    .discount_contain_box {
                        width: calc(100% - 100px);
                        margin-top: 100px;
                        .contain_item {
                            position: relative;
                            margin-left: 16px;
                            margin-bottom: 32px;
                            .item_time {
                                width: 50px;
                                height: 50px;
                                text-align: center;
                                padding: 10px 0;
                                border-radius: 50%;
                                overflow: hidden;
                                word-break: break-all;
                                font-size: 14px;
                                background-color: #383C53;
                                color: #9296B6;
                                position: absolute;
                                left: -116px;
                                transform: translateX(50%);
                                top: 0;
                            }
                            .item_title {
                                width: 370px;
                                height: 50px;
                                background-image: url(../assets/discount_title_bg.png);
                                background-size: cover;
                                color: #FFD8A5;
                                font-size: 20px;
                                padding: 5px 26px;
                                margin-bottom: 26px;
                            }
                            .item_detail {
                                .item_img_wrap {
                                    width: 60%;
                                    img {
                                        width: 100%;
                                        margin-bottom: 16px;
                                    }
                                }
                                .item_controll {
                                    color: #45a9f9;
                                    cursor: pointer;
                                }
                                .item_auto_height {
                                    height: auto;
                                }
                                .item_fix_height {
                                    height: 25px;
                                }
                                .change_height {
                                    transition: height .1s;
                                    overflow: hidden;
                                }
                                line-height: 1.5;
                                color: #474D5C;
                            }
                        }
                    }
                }
            }

            .mine_box {
                color: #474D5C;
                .contain {
                    width: 100%;
                    margin-top: 42px;
                    .contain_item {
                        display: inline-block;
                        margin-right: 2px;
                        margin-bottom: 6px;
                        cursor: pointer;
                        transition: all .3s;
                        &.contain_item_over {
                            transform: scale(1.04);
                            .contain_title {
                                background-color: #232546;
                                &::before {
                                    content: "";
                                    height: 25px;
                                    width: 1px;
                                    background-color: #959DB4;
                                    position: absolute;
                                    right: 58px;
                                    top: 50%;
                                    transform: translateY(-50%);
                                }
                            }
                        }
                        &:last-child {
                            margin-right: 0;
                        }
                        .contain_img {
                            width: 238px;
                            height: 193px;
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .contain_title {
                            height: 45px;
                            line-height: 45px;
                            text-align: center;
                            font-size: 16px;
                            color: #959DB4;
                            background-color: #0d0e1a;
                            position: relative;
                            .like_it {
                                width: 25px;
                                height: 25px;
                                position: absolute;
                                right: 20px;
                                top: 50%;
                                transform: translateY(-50%);
                            }
                        }
                    }
                }
            }
        }

        .nav_classify_box {
            margin: 42px 0;
            .top_box {
                display: flex;
                .nav_holder {
                    width: 200px;
                    margin-right: 28px;
                }
                .nav {
                    width: 200px;
                    margin-right: 28px;
                    &.p_top {
                        position: fixed;
                        top: 72px;
                    }
                    .nav_item {
                        height: 43px;
                        line-height: 43px;
                        padding-left: 12px;
                        font-size: 18px;
                        color: #575F75;
                        background-color: #13131c;
                        margin-bottom: 6px;
                        cursor: pointer;
                        &:hover {
                            color: rgba(120, 197, 241, 1);
                        }
                        &.cur {
                            font-size: 20px;
                            color: #C7AB90;
                            background-color: rgba(33,34,49,1);
                        }
                        .nav_sm_icon {
                            margin-right: 6px;
                        }
                    }
                }
                .contain {
                    width: calc(100% - 200px - 28px);
                    .contain_item {
                        display: inline-block;
                        margin-right: 5px;
                        margin-bottom: 6px;
                        cursor: pointer;
                        transition: all .3s;
                        &.contain_item_over {
                            transform: scale(1.04);
                            .contain_title {
                                background-color: #232546;
                                &::before {
                                    content: "";
                                    height: 25px;
                                    width: 1px;
                                    background-color: #959DB4;
                                    position: absolute;
                                    right: 58px;
                                    top: 50%;
                                    transform: translateY(-50%);
                                }
                            }
                        }
                        &:last-child {
                            margin-right: 0;
                        }
                        .contain_img {
                            width: 238px;
                            height: 193px;
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .contain_title {
                            height: 45px;
                            line-height: 45px;
                            text-align: center;
                            font-size: 16px;
                            color: #959DB4;
                            background-color: #0d0e1a;
                            position: relative;
                            .like_it {
                                width: 25px;
                                height: 25px;
                                position: absolute;
                                right: 20px;
                                top: 50%;
                                transform: translateY(-50%);
                            }
                        }
                    }
                }
            }
        }

        .propagate_box {
            display: flex;
            margin-bottom: 50px;
            .propagate_item {
                margin-right: 16px;
                flex: 1;
                &:last-child {
                    margin-right: 0;
                }
                .item_title_box {
                    font-size: 16px;
                    /* background-color: #12131F; */
                    padding: 30px 10px;
                    margin-bottom: 26px;
                    .item_title {
                        color: #FEFEFE;
                        margin-bottom: 16px;
                    }
                    .item_title_text {
                        color: #FFD8A5;
                        font-size: 14px;
                    }
                }
                .item_title_box_vip {
                    font-size: 16px;
                    background-color: #12131F;
                    padding: 50px 10px;
                    margin-bottom: 26px;
                    .vip_item_pic {
                        display: inline-block;
                        margin-bottom: 32px;
                        width: calc((100% - 20px) / 3);
                    }
                }
                .item_contain_box {
                    .item_contain {
                        margin-bottom: 26px;
                    }
                    img {
                        width: 160px;
                        height: 160px;
                        margin: 0 auto 26px;
                        display: block;
                    }
                    p {
                        color: #C7AB90;
                        font-size: 14px;
                    }
                }
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
                .nav_item {
                    width: calc(100% / 6);
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
        .shade {
            background-color: rgba(0, 0, 0, .7);
            width: 100%;
            z-index: 1992;
            position: fixed;
            top: 0;
        }
        .shadeForMsgBox {
            background-color: rgba(0, 0, 0, .7);
            width: 100%;
            z-index: 19490930;
            position: fixed;
            top: 0;
        }

        .signup_popup {
            width: 500px;
            background-image: url(../assets/bg.png);
            background-size: cover;
            position: fixed;
            z-index: 10000;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            overflow: hidden;
            padding-bottom: 32px;
            border-radius: 4px;
            .signup_header {
                height: 50px;
                line-height: 50px;
                position: relative;
                text-align: center;
                color: #FDD6A3;
                font-size: 20px;
                background-color: #131422;
                span {
                    position: absolute;
                    right: 5px;
                    top: 10px;
                    transform: translateY(-50%);
                    cursor: pointer;
                    font-size: 22px;
                }
            }
            .signup_controll {
                color: #9198AC;
                font-size: 14px;
                border-bottom: 1px solid rgba(40, 43, 58, .6);
                margin: 30px 32px;
                .signup_item {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 16px;
                    .item_title {
                        width: 100px;;
                    }
                    input {
                        background-color: transparent;
                        border: 1px solid rgba(40,43,58,1);
                        border-radius: 4px;
                        height: 38px;
                        width: 250px;
                        padding-left: 20px;
                    }
                    &.sms_item {
                        input {
                            width: calc(250px / 2);
                            margin-right: 20px;
                        }
                        .send_sms {
                            width: calc(250px / 2 - 20px);
                            height: 38px;
                            line-height: 38px;
                            border: 1px solid rgba(93, 80, 64, 1);
                            border-radius: 4px;
                            color: #5D5040;
                            text-align: center;
                            cursor: pointer;
                            &.disabled {
                                cursor: not-allowed;
                            }
                        }
                    }
                }
                .tips {
                    color: #B53132;
                    font-size: 14px;
                    margin: -16px 0 16px 140px;
                }
                .agress_protocol {
                    width: calc(100px + 250px);
                    margin: 40px auto 20px;
                    overflow: hidden;
                    label {
                        float: right;
                    }
                    .user_protocol {
                        color: #556FB7;
                        text-decoration: underline;
                        cursor: pointer;
                    }
                }
            }
            .submit_btn {
                width: 120px;
                height: 38px;
                line-height: 38px;
                border-radius: 4px;
                cursor: pointer;
                text-align: center;
                color: #5B3A0C;
                background-image: url(../assets/btn_bg.png);
                margin-right: 70px;
                float: right;
            }
        }

        .agent_login_popup {
            width: 500px;
            background-image: url(../assets/bg.png);
            background-size: cover;
            position: fixed;
            z-index: 10000;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            overflow: hidden;
            padding-bottom: 32px;
            border-radius: 4px;
            .signup_header {
                height: 50px;
                line-height: 50px;
                position: relative;
                text-align: center;
                color: #FDD6A3;
                font-size: 20px;
                background-color: #131422;
                span {
                    position: absolute;
                    right: 5px;
                    top: 10px;
                    transform: translateY(-50%);
                    cursor: pointer;
                    font-size: 22px;
                }
            }
            .signup_controll {
                color: #9198AC;
                font-size: 14px;
                border-bottom: 1px solid rgba(40, 43, 58, .6);
                margin: 30px 32px;
                .signup_item {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 16px;
                    .item_title {
                        width: 100px;;
                    }
                    input {
                        background-color: transparent;
                        border: 1px solid rgba(40,43,58,1);
                        border-radius: 4px;
                        height: 38px;
                        width: 250px;
                        padding-left: 20px;
                    }
                    &.sms_item {
                        input {
                            width: calc(250px / 2);
                            margin-right: 20px;
                        }
                        .send_sms {
                            width: calc(250px / 2 - 20px);
                            height: 38px;
                            line-height: 38px;
                            border: 1px solid rgba(93, 80, 64, 1);
                            border-radius: 4px;
                            color: #5D5040;
                            text-align: center;
                            cursor: pointer;
                            &.disabled {
                                cursor: not-allowed;
                            }
                        }
                    }
                }
                .tips {
                    color: #B53132;
                    font-size: 14px;
                    margin: -16px 0 16px 140px;
                }
                .agress_protocol {
                    width: calc(100px + 250px);
                    margin: 40px auto 20px;
                    overflow: hidden;
                    label {
                        float: right;
                    }
                    .user_protocol {
                        color: #556FB7;
                        text-decoration: underline;
                        cursor: pointer;
                    }
                }
            }
            .submit_btn {
                width: 120px;
                height: 38px;
                line-height: 38px;
                border-radius: 4px;
                cursor: pointer;
                text-align: center;
                color: #5B3A0C;
                background-image: url(../assets/btn_bg.png);
                margin-right: 70px;
                float: right;
            }
        }

        .agent_signup_popup {
            width: 500px;
            background-image: url(../assets/bg.png);
            background-size: cover;
            position: fixed;
            z-index: 10000;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            overflow: hidden;
            padding-bottom: 32px;
            border-radius: 4px;
            .signup_header {
                height: 50px;
                line-height: 50px;
                position: relative;
                text-align: center;
                color: #FDD6A3;
                font-size: 20px;
                background-color: #131422;
                span {
                    position: absolute;
                    right: 5px;
                    top: 10px;
                    transform: translateY(-50%);
                    cursor: pointer;
                    font-size: 22px;
                }
            }
            .signup_controll {
                color: #9198AC;
                font-size: 14px;
                border-bottom: 1px solid rgba(40, 43, 58, .6);
                margin: 30px 32px;
                .signup_item {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 16px;
                    .item_title {
                        width: 100px;;
                    }
                    input {
                        background-color: transparent;
                        border: 1px solid rgba(40,43,58,1);
                        border-radius: 4px;
                        height: 38px;
                        width: 250px;
                        padding-left: 20px;
                    }
                    &.sms_item {
                        input {
                            width: calc(250px / 2);
                            margin-right: 20px;
                        }
                        .send_sms {
                            width: calc(250px / 2 - 20px);
                            height: 38px;
                            line-height: 38px;
                            border: 1px solid rgba(93, 80, 64, 1);
                            border-radius: 4px;
                            color: #5D5040;
                            text-align: center;
                            cursor: pointer;
                            &.disabled {
                                cursor: not-allowed;
                            }
                        }
                    }
                }
                .tips {
                    color: #B53132;
                    font-size: 14px;
                    margin: -16px 0 16px 140px;
                }
                .agress_protocol {
                    width: calc(100px + 250px);
                    margin: 40px auto 20px;
                    overflow: hidden;
                    label {
                        float: right;
                    }
                    .user_protocol {
                        color: #556FB7;
                        text-decoration: underline;
                        cursor: pointer;
                    }
                }
            }
            .submit_btn {
                width: 120px;
                height: 38px;
                line-height: 38px;
                border-radius: 4px;
                cursor: pointer;
                text-align: center;
                color: #5B3A0C;
                background-image: url(../assets/btn_bg.png);
                margin-right: 70px;
                float: right;
            }
        }

        .notice_popup {
            width: 410px;
            background-image: url(../assets/bg.png);
            background-size: cover;
            position: fixed;
            z-index: 199506;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            .notice_img {
                width: 100%;
                height: 163px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .notice_main_contain_box {
                margin: 32px 16px;
                border-bottom: 1px solid rgba(40, 43, 58, .36);
                overflow-x: auto;
                .contain_title {
                    font-size: 22px;
                    color: #EBD6AC;
                    text-align: center;
                    padding-bottom: 16px;
                    border-bottom: 2px solid #EBD6AC;
                    margin-bottom: 20px;
                }
                .contain_text {
                    font-size: 16px;
                    color: #949BB0;
                    line-height: 1.5;
                }
            }
            .notice_controlls {
                display: flex;
                justify-content: center;
                margin-bottom: 16px;
                .notice_btn {
                    width: 120px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    border-radius: 4px;
                    color: #5C3925;
                    border: 1px solid #5C3925;
                    margin-left: 70px;
                    cursor: pointer;
                    &:first-child {
                        margin: 0;
                    }
                }
            }
        }
        .fade-enter-active, .fade-leave-active {
            transition: opacity .4s;
        }
        .fade-enter, .fade-leave-to {
            opacity: 0;
        }

        .help_box_wrap {
            position: fixed;
            right: -190px;
            top: 15%;
            /* transform: translateY(-50%); */
            z-index: 1991;
            width: 190px;
            transition: right .4s;
            &.show_more {
                right: 0;
            }
        }
        .help_box {
            width: 50px;
            height: 110px;
            background-color: rgba(164, 136, 96, 1);
            padding: 7px;
            text-align: center;
            position: absolute;
            left: -50px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 666;
            border-radius: 4px 0 0 4px;
            cursor: pointer;
            .no_read {
                position: absolute;
                top: -15px;
                left: -15px;
                height: 30px;
                width: 30px;
                text-align: center;
                line-height: 30px;
                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .6);
                border-radius: 50%;
                background-color: #F32626;
                color: #fff;
            }
            .title {
                color: rgba(255, 227, 186, 1);
                border: 1px solid rgba(255, 255, 255, .3)
            }
        }

        .help_detail_box {
            width: 190px;
            background-image: linear-gradient(to bottom, rgba(172, 145, 105, 1), rgba(185, 151, 105, 1));
            background-color: rgba(164, 136, 96, 1);
            padding: 5px;
            border-radius: 4px 0 0 4px;
            cursor: pointer;
            text-align: center;
            line-height: 1.5;
            .help_detail_with_border {
                border: 1px solid rgb(154, 127, 89);
                border-radius: 5px;
                .help_detail_item {
                    padding: 8px 0;
                    border-top: 1px solid rgb(154, 127, 89);
                    &:first-child {
                        border: none;
                        padding-top: 0;
                    }
                    .kefu_phone {
                        color: rgba(64, 42, 11, 1);
                        &:hover {
                            color: rgba(179, 56, 40, 1);
                        }
                    }
                    .kefu {
                        width: 120px;
                        height: 100%;
                        transition: all .3s;
                        &.bigIcon {
                            transform: scale(1.1);
                        }
                    }
                    p {
                        color: rgba(255, 227, 186, 1);
                        font-size: 18px;
                        margin-bottom: 5px;
                    }
                    div {
                        color: #040304;
                        font-size: 16px
                    }
                    .red {
                        color: #B53132;
                    }
                    img {
                        width: 90px;
                        height: 90px;
                    }
                }
            }
        }
        .helpFade-enter-active, .helpFade-leave-active {
            transition: right .2s linear;
        }
        .helpFade-enter, .helpFade-leave-to {
            right: 0;
        }
        
        .footer {
            widows: 100%;
            background-color: rgba(0, 0, 0, 1);
            opacity: .8;
            color: #575F75;
            font-size: 16px;
            padding: 20px 0;
            margin-top: 32px;
            .contain_1200 {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .link_list {
                    display: flex;
                    li {
                        padding: 0 5px;
                        border-right: 1px solid #575F75;
                        cursor: pointer;
                        &:last-child {
                            border: none;
                        }
                        &:hover {
                            color: rgba(190, 202, 236, 1);
                            text-decoration: underline;
                        }
                    }
                }
            }
        }
        .chatBox {
            position: fixed;
            bottom: 10px;
            right: 0;
            z-index: 3141592653;
        }
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

    .agent_popup {
        position: absolute;
        top: 40px;
        z-index: 1995;
        width: 80vw;
        min-width: 1200px;
        left: 50%;
        transform: translateX(-50%);
    }

</style>