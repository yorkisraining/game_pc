<!-- gameHistory 游戏记录 -->
<template>
    <div class="game_his_box">
        <div class="result_table">
            <div class="result_over">
                <div class="result_table_head">
                    <div v-for="(item, index) in tableHeadList" :key="index">{{item}}</div>
                </div>
                <div class="result_table_items" v-for="item in tableResult" :key="item.id">
                    <div>{{item.month}}</div>
                    <div>{{item.commission * 100}}</div>
                    <div>{{item.status == 1 ? 0 : item.commission}}</div>
                    <div>{{item.status == 1 ? item.commission : 0}}</div>
                    <div>{{item.deposit}}</div>
                    <div>{{item.noteNum * 100}}</div>
                    <div>{{item.profit}}</div>
                    <div>{{item.rewardNum}}</div>
                    <div>{{item.rebate}}</div>
                    <div>{{item.updateTime}}</div>
                    <div>{{item.status | filterStatus}}</div>
                    <div class="to_game_btn"><div @click="tixian(item.id, item.activeFlag, item.status)" :class="{'disabled': item.activeFlag == 0 || item.status != 0}">提现</div></div>
                </div>
            </div>
            <div class="page">
                <el-pagination
                    layout="prev, pager, next"
                    :total="totalCount"
                    @current-change="changePage">
                </el-pagination>
            </div>
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
            tableHeadList: ['月份', '会员总佣金','会员可提现金额','已提现金额', '会员总存款',  '会员投注额',  '会员总赢利',  '会员总优惠奖金',  '会员返水',  '数据更新时间',  '状态',  '操作'],
            tableResult: [],
            totalCount: 10, //总条目数
            page: 1,
            limit: 10,
            msgBox: '',
            isShowMsgBox: false,
        };
    },
    filters: {
        filterPrice(val) {
            return val.toFixed(2);
        },
        filterStatus(val) {
            //0 未申请；1已发放；2审核中；3审核不通过
            switch (Number(val)) {
                case 0:
                    return `未申请`;
                    break;
                case 1:
                    return `已发放`;
                    break;
                case 2:
                    return `审核中`;
                    break
                case 3:
                    return `审核不通过`;
                    break
                default:
                    return ``;
                    break;
            }
        }
    },
    created() {
        this.getTableList();
    },
    methods: {
        showMsgBox(val) {
            this.isShowMsgBox = true;
            this.msgBox = val;
        },
        closeMsgBox() {
            this.isShowMsgBox = false;
        },
        getTableList() {
            ajaxPost(apiUrl.agentTcomsumList, {
                page: this.page,
                limit: this.limit,
            }, res => {
                if (res.code != 500) {
                    this.tableResult = res.page.list;
                    this.totalCount = res.page.totalCount;
                }
            })
        },
        changePage(page) {
            this.page = page;
            this.getTableList();
        },
        tixian(id, flag, status) {
            if (flag == 1 && status == 0) {
                ajaxGet(`${apiUrl.agentWithdraw}`, {
                    id: id
                }, res => {
                    if (res.code != 500) {
                        this.showMsgBox(`操作成功`);
                    }
                })
            }
        },
    }
}

</script>
<style lang='less' scoped>
.game_his_box {
    margin-top: 26px;
    .result_table {
        margin: 10px;
        .result_over {
            overflow-x: auto;
        }
        .result_table_head {
            display: flex;
            div {
                flex: 1;
                height: 50px;
                line-height: 50px;
                padding-left: 10px;
                color: #9198AC;
                font-size: 16px;
                background-color: rgba(70, 74, 94, .13);
                min-width: 140px;
            }
        }
        .result_table_items {
            display: flex;
            text-align: left;
            color: #9198AC;
            font-size: 16px;
            >div {
                min-width: 140px;
                flex: 1;
                height: 50px;
                line-height: 50px;
                border-bottom: 1px solid #464A5E;
                padding-left: 10px;
                background-image: linear-gradient(145deg,rgba(19,20,34,0.68),rgba(19,20,34,0) );
                &.to_game_btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    div {
                        width: 100px;
                        height: 38px;
                        text-align: center;
                        line-height: 38px;
                        border-radius: 5px;
                        color: #fff;
                        background-color: #409EFF;
                        cursor: pointer;
                        &.disabled {
                            background-color: #ccc;
                            cursor: not-allowed;
                        }
                    }
                    
                }
            }
        }
        .page {
            margin-top: 32px;
            float: right;
        }
    }
    
}
</style>