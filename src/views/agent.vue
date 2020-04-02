<!-- 代理 -->
<template>
    <div class="index">
        <!-- banner -->
        <div class="carousel_box">
            <img src="@/assets/agent_banner.png" />
        </div>
        
        <!-- 主内容区 -->
        <div class="main_contain">
            <div class="guide_box">
                <div class="guide_box_qq">
                    <img src="@/assets/agent_QQ.png" />
                    <!-- 在线代理 123456789 -->
                </div>
                <img class="guide_box_close" src="@/assets/agent_guanbi.png" @click.stop="closeThis" />
                <img class="guide_box_bg" src="@/assets/agent_diban.png" />
                <img class="login_btn guide_box_btn" src="@/assets/agent_anniu_denglu.png" @click.stop="toLogin" />
                <img class="signup_btn guide_box_btn" src="@/assets/agent_anniu_zhuce.png" @click.stop="toSignup" />
            </div>
            <div class="contain_box">
                <div class="contain_box_nav">
                    <div class="contain_box_nav_item" v-for="(item, index) in navDatas" :key="item" @click="() => {curNav = index}" :class="{cur: curNav == index}">{{item}}</div>
                </div>
                <div class="contain_box_msg" v-if="curNav == 0">
                    <div class="section">
                        <div class="title">品牌介绍</div>
                        <div class="page">
                            隶属于—PIONEER SOLUTIONS TECHNOLOGY DEVELOPMENT LIMITED。注册于菲律宾，并持有菲律宾PAGCOR合法博彩牌照。公司于2013年成立，公司总部设在菲律宾马尼拉。 
国际与世界领先合法博彩娱乐PT平台，TTG系统商进行技术上合作。提供有亚洲最多元，专业，顶尖，公正，安全的线上娱乐产品服务。 赢利国际提供给玩家的娱乐产品有，真人娱乐，老虎机，棋牌，体育竞技，彩票等多样化娱乐休闲的选择，让代理/联盟推广起来给予多样化模式运行。 无论您拥有的是网络资源，或是人脉资源，都欢迎您来加盟赢利国际合作伙伴的行列，无须负担任何费用，就可以开始无上限的收入。赢利国际绝对是您最明智的选择!
                        </div>
                    </div>
                    <div class="section">
                        <div class="title">公司理念</div>
                        <div class="page">
                            秉承以小赌怡情、以小博大的宗旨，科技立身为宗旨，为业界研发打造10秒到账「秒提」「秒存」技术，致力为博弈界打造提款最迅速的游戏平台。
                        </div>
                    </div>
                    <div class="section">
                        <div class="title">品牌优势</div>
                        <div class="page">
                            1提款：20万以下提款10秒到账，全球首发。 
                            2服务：最专业的客服团队7*24为您服务，随时欢迎您的光临。 
                            3安全：赢利采用256位SSL高标准加密技术，保您安全无忧。 
                            4佣金结算：赢利国际采用全球最优质的结算方式日结佣金。 
                            5产品丰富：业界最火平台，上千款游戏，满足您的需求。 
                            6强大的品牌优势：多年业界运营实践经验，资讯丰富。 
                            7平台自动化：拥有全自动化系统，自助优惠，自助洗码，自动佣金结算。 
                            8免费加盟：我们承诺无需您投入一分钱，便可加盟我们的合营计划，享受超高比例佣金。

                        </div>
                    </div>
                </div>
                <div class="contain_box_msg" v-else-if="curNav == 1">
                    <div class="section">
                        <div class="title">一、协议双方</div>
                        <div class="page">
                            甲方（授权方）赢利国际 
                            乙方（获权方）代理方 
                            甲乙双方秉承合作共赢的事宜达成协议，具体协议如下
                        </div>
                    </div>
                    <div class="section">
                        <div class="title">二、协议双方说明</div>
                        <div class="page">
                            A，当您要注册合作账户时，请您详细地看下我们的合作协议书，再考虑是否愿意合作。 
                            B，当您注册完账户后，代理部会为您审核是否通过，以邮件或QQ的形式告知乙方。 
                            C，本协议在甲方乙方同意下立即生效(注册合作账户审核通过后默认生效)。
                        </div>
                    </div>
                    <div class="section">
                        <div class="title">三、佣金结算时间和方式</div>
                        <div class="page">
                            1，佣金方案
                            您只需要网络推广或是介绍您身边朋友成为我们的玩家，赢利国际会根据代理每月游戏的净利润收入按照佣金比例计算佣金。
                            <!-- <table>
                                等级	当月活跃会员数	当月净利润	佣金比例
                                1	≧3	0-300,000	25%
                                2	≧15	300,001-1,000,000	30%
                                3	≧40	1,000,001-2,000,000	35%
                                4	≧100	≧2,000,001	45%

                            </table> -->
                            结算方式 佣金计算
                            纯利佣金 (PT、MG、IG、KY、平台输赢x85%-优惠-返水)x 佣金比例
                            多层纯利佣金 纯利润 x 当月佣金比例+下级代理佣金*10%
                            2，佣金结算结标准：
                            计算公式：(平台输赢x85%-优惠-反水）=纯利润 纯利润x佣金比例=佣金。
                            提款要求：代理账户老虎机平台佣金额度大于100元即可提款。
                            佣金累积：如代理账户佣金当月为负数，将累积到下个月。
                            备注: (1-5号此时间段佣金不更新，于6号统一执行！)。

                            注：最终综合评定方可晋级，佣金负值累计。若合作伙伴自己的游戏账号注册 到自己代理下线，取消代理资格，佣金不予发放。
                            玩家输赢里面包含了平台给玩家的所有优惠红利 以及公司向平台方支付的平台费用，赢利国际合作伙伴需共同承担相应比例的费用包括：
                            （1）优惠——赢利国际给予玩家的现金红利都计算在输赢里面。
                            （2）反水——赢利国际每日会给玩家相应的反水，反水计算在玩家输赢里面。
                            （3）平台费用——赢利国际需提款游戏平台供应商10%~15%的平台费用。
                            合作伙伴必须严格遵守赢利国际相关条款条例，以免造成不必要的误会。
                            3，佣金计算标准：
                            1. 针对佣金发放日为每月1—5号。(结算时间为自然月：上月1号：00:00点至本月1号00:00)。
                            2. 当月达到3位有效会员且佣金大于100元。
                            3. 有效会员标准，当月存款大于500元，投注额大于1000元。
                            4. 若当月未达到发放标准，佣金会累计至某月达到要求后一起发放。
                            5. 若当月代理佣金为负值，会累计至下月，等至累计正数且要求达到后佣金发放。
                            6. 若合作伙伴自己的游戏账号注册到自己代理下线，取消代理资格，佣金不予发放。
                        </div>
                    </div>
                </div>
                <div class="contain_box_msg" v-else>
                    <div class="section">
                        <div class="title">1.怎样注册代理？</div>
                        <div class="page">
                            A:登陆代理页面即可看到"申请加盟"字样，点击即可来到注册页面，注册的时候，请仔细阅读我们的代理合作协议说明书。
                        </div>
                    </div>
                    <div class="section">
                        <div class="title">2.合营代理有任何费用吗？</div>
                        <div class="page">
                            A:这是零投资的赚钱方式，您是无需花费任何费用开始，仅仅只需点击"立即注册"，注册后您将拥有一个独一无二的合营官网链接，然后便能开始向您的会员宣传推广而赚取佣金了。
                        </div>
                    </div>
                    <div class="section">
                        <div class="title">3.怎样赚取佣金？支付佣金是怎么样的？</div>
                        <div class="page">
                            
                        </div>
                    </div>
                    <div class="section">
                        <div class="title"></div>
                        <div class="page">
                            A:只要您注册了代理账号之后，会生成一个您独立的连接，然后您可以推广自己的连接，让其他人在您的连接注册并且游戏。然后他们产生负盈利的话，你就有佣金了。我们会按照日结累计，只要您满足佣金累计到了1000以上就可以随时提款。
                        </div>
                    </div>
                    <div class="section">
                        <div class="title">4.我怎么能知道我一个月挣了多少钱？</div>
                        <div class="page">
                            A: 赢利国际拥有强大的技术团队，所有合营人员都可以自己登陆自己的账号查看到自己下线的输赢情况（登陆账号——点击账户管理——佣金明细）。
                        </div>
                    </div>
                    <div class="section">
                        <div class="title">5.我如何知道注册的会员是不是在我的下线？</div>
                        <div class="page">
                            A:如果您推荐的会员有注册成功，那么您直接可以在自己的后台看到他的情况。（登陆账号——点击账户管理——下线会员）。
                        </div>
                    </div>
                    <div class="section">
                        <div class="title">6.如何能保证我的佣金可以结算给我？</div>
                        <div class="page">
                            A: 赢利国际所有的结算系统都是采用了强大技术创造的全自动结算模式。只要您下线会员有产生负盈利，那么系统会自动结算完毕，添加到合营账户中，您只需要申请提款即可。
                        </div>
                    </div>
                    <div class="section">
                        <div class="title">7.下线会员无法打开连接怎么处理？</div>
                        <div class="page">
                            A: 赢利国际是属于菲律宾正规博弈老虎机娱乐城，国内一些具有拦截性质的浏览器会产生一些影响，建议会员使用谷歌浏览器进入，您也可以联系我们的在线客服索要备用网址。
                        </div>
                    </div>
                    <div class="section">
                        <div class="title">8.下线会员的情况我可以看到吗？</div>
                        <div class="page">
                            A:合营人员可以在自己的合营账号看到下线会员所有的存款、提款、输赢等信息！所有的信息都在账户管理可以看到的哦！ 
                        </div>
                    </div>
                    <div class="section">
                        <div class="title">9.合营连接是否可以修改？</div>
                        <div class="page">
                            A：如果您需要修改您的合营链接，那么您可以联系我们的市场部门专员，提供您的注册信息，进行修改您自己熟悉的链接哦！
                        </div>
                    </div>
                    <div class="section">
                        <div class="title">10.长时间没有登录忘记了密码，或者输入5次错误密码被冻结怎么办？</div>
                        <div class="page">
                            A：如果忘记密码或者账号被锁定，您可以直接点击"登入"后面的"忘记密码"使用邮箱或者电话进行重置，重置成功之后账号自动恢复正常的哦! 
                        </div>
                    </div>
                    <div class="section">
                        <div class="title">11.日结佣金需要达到一个什么样的条件？</div>
                        <div class="page">
                            A：所有代理无需申请，自动日结不需要任何条件！
                        </div>
                    </div>
                    <div class="section">
                        <div class="title">12.我可以自己注册到自己的下线游戏吗？</div>
                        <div class="page">
                            A：赢利国际绝对禁止此类事件，具体的相关条例，请参照我们代理合作协议的责任与条款！
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import http from '@/common/js/httpRequest'

export default {
    data () {
        return {
            navDatas: ['品牌优势', '佣金计划', '常见问题'],
            curNav: 0,
        };
    },
    filters: {
    },
    methods: {
        toLogin() {
            this.$emit('clickAgentLogin');
        },
        toSignup() {
            this.$emit('clickAgentSignup');
        },
        closeThis() {
            this.$emit('closeAgent');
        }
    }
}

</script>
<style lang='less' scoped>
.index {
    height: 100%;
    font-size: 18px;
    background-image: url('../assets/agent_diban_zhuce.png');
    background-size: cover;
    background-repeat: no-repeat;

    .carousel_box {
        width: 100%;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .main_contain {
        margin: 0 auto;
        .guide_box {
            position: relative;
            .guide_box_qq {
                position: absolute;
                display: flex;
                align-items: center;
                top: 15px;
                left: 32px;
                color: rgb(91, 58, 12);
                img {
                    width: 32px;
                    margin-right: 10px;
                }
            }

            .guide_box_bg {
                width: 100%;
            }

            .guide_box_close {
                position: absolute;
                top: 10px;
                right: 10px;
                width: 15px;
            }

            .guide_box_btn {
                position: absolute;
                top: 80px;
                width: 120px;
                right: 100px;
                cursor: pointer;
                transition: opacity .3s;
                &:hover {
                    opacity: .8;
                }
            }

            .login_btn {
                right: 252px;
            }
        }

        .contain_box {

            .contain_box_nav {
                border-bottom: 1px solid #9198AC;
                color: #9198AC;
                height: 50px;
                line-height: 50px;
                display: flex;
                align-items: center;
                text-align: center;
                margin-bottom: 32px;
                cursor: pointer;
                .contain_box_nav_item {
                    width: 150px;
                    &.cur {
                        color: #EBD6AC;
                        border-bottom: 1px solid #EBD6AC;
                    }
                }
            }

            .contain_box_msg {
                font-size: 14px;
                .section {
                    padding-bottom: 32px;
                    color: #9198AC;
                    .title {
                        color: #EBD6AC;
                    }
                }
            }
        }
    }

}

</style>