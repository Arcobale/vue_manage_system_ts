<template>
  <div class="notfound">
    <div class="wrapper">
        <div class="big">页面不见了！</div>
        <div>首页瞧瞧，点击<router-link to="/home">这里</router-link>进入首页。</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.notfound {
    height: 100%;
    .wrapper {
        position: absolute;
        width: 635px;
        font-size: 19px;
        line-height: 29px;
        -webkit-font-smoothing: antialiased;
        padding: 20px;
        font-family: 'Source Sans Pro', sans-serif;
        .big {
            font-size: 74px;
            font-weight: 700;
            line-height: 68px;
            margin-bottom: 48px;
        }
        a {
            color: #ffcc00;
            text-decoration: none;
            font-weight: 700;
            cursor: pointer;
        }
    }
}
@media only screen and (max-width: 666px) {
    .notfound .wrapper {
        left: auto;
        right: 0;
        width:100%;
        max-width: 450px;
        top: 35%;
        .big {
            font-size: 42px;
            line-height: 50px;
            margin-bottom: 15px;
        }
    }
}
</style>