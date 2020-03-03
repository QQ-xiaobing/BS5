<template>
<div id=app>
	<!-- 顶部导航 -->
  <nav>
  	<ul>
  		<li>
  			<router-link to="/index" exact>首页</router-link>
  			<router-link to="/home" exact>我的</router-link>
  		</li>
  	</ul>
  </nav>
             <!-- 内容区 -->
        <div class="withDiv">
            <router-view class="middle"></router-view>
        </div>
		<div class="foot">


		</div>
  </div>


</template>

<script>
  export default {
   
  }
</script>

<style scoped>
 #app {
        padding: 0;
        margin: 0 auto;
    }

    .withDiv {
        width: 1200px;
        padding: 0;
        margin: 0 auto;
    }
ul{
	list-style-type: none;/*消除黑点*/
	text-align: center;
	margin:0;
}

li{
	display: inline-block;
	margin: 0 10px;
}

a{
	color: #fff;
	text-decoration:none;
	padding: 12px;
	border-radius: 15px;
}
nav{
	background: grey;
	padding: 30px 0;
}

/*选中则发生一些变化*/
.router-link-active{
	background: rgba(255,255,255,0.8);
	color: #444;
}
</style>