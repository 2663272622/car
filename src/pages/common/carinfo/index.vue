<template>
	<view class="u-wrap">
    <u-navbar
        title="我的挪车码"
        :autoBack="true"
        :placeholder='true'
    >
    </u-navbar>


	</view>
</template>
<script>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/store';
import {request} from '@/utils/request';

const userStore = useUserStore()

 </script>

<style lang="scss"  >

</style>
