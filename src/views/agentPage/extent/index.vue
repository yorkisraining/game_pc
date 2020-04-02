<template>
  <div class="box">
      <div>
          
            <div class="items">
                推广链接：{{link}}
            </div>
            <div class="items">
                推广二维码：
                <qriously :value="code" :foreground="background" :size="150" />
            </div>
          
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            link: ``,
            code: ``,
            background: `white`
        }
    },
    created() {
        let msg = localStorage.getItem('agentData') ? JSON.parse(localStorage.getItem('agentData')) : {};
        
        this.link = msg.proxyLink;
        this.qrcodeUrl = msg.qrcodeUrl;
    }
}
</script>

<style lang='less' scoped>
.box {
    padding: 50px;
}

.items {
    display: flex;
    color: #9198AC;
    margin-bottom: 32px;
    font-size: 18px;
}
</style>