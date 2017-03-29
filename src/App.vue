<style lang='scss'>
	@import './assets/styles/main.scss';
</style>

<template>
    <div id="app">
    	<keep-alive>
    		<router-view v-if="$route.meta.keep"></router-view>
    	</keep-alive>

    	<router-view v-if="!$route.meta.keep"></router-view>
    </div>
</template>
