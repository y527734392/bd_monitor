<template>
		<div class="table-div">
			<table class="manage-table">
				<thead>
					<tr>
						<th width="3%"><input type="checkbox" name="check-all" disabled="disabled"></th><th width="9%">ID</th><th width="8%">状态</th><th width="14%">监控名称</th><th width="5%">级别</th><th width="11%">监控类别</th><th width="15%">报警时间</th><th width="20%">报警详情</th><th width="15%">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(value,index) in childAlarmTable">
						<td><input type="checkbox" disabled="disabled"></td>
						<td>{{value.id}}</td>
						<td v-if="value.process_status == 0">未处理</td>
						<td v-else-if="value.process_status == 1">处理中</td>
						<td v-else-if="value.process_status == 2">已处理</td>
						<td>{{value.item_name}}</td>
						<td>{{value.item_level}}</td>
						<td v-if="value.item_type == 0">http可用性</td>
						<td v-else-if="value.item_type == 1">数据接口</td>
						<td v-else-if="value.item_type == 2">页面元素</td>
						<td>{{value.alert_time | formatDate}}</td>
						<td>{{value.alert_detail}}</td>
						<td v-if="value.process_status == 0"><a href="javascript:;" :data-alerid="value.id" :data-index="index" @click="startDo" >开始处理</a><router-link :to="'/alarminfo/'+value.id" target="_blank">完成处理</router-link></td>
						<td v-else-if="value.process_status == 1"><router-link :to="'/alarminfo/'+value.id" target="_blank">完成处理</router-link></td>
						<td v-else-if="value.process_status == 2"><router-link :to="'/alarminfo/'+value.id" target="_blank">查看详情</router-link></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
import vueGetData from "../../Js/vueGetData.js"

	export default {
		name: 'Alarmtable',
		data () {
			return {
				// childAlarmTable: {}
			}
		},
		// props:["alarmquerydatas"],
		computed:mapGetters({
			childAlarmTable:"alarmlist",
			alarmquerydata:"alarmquerydata"
		}),
		watch: {
		},
		mounted: function(){
			// this.getTableList()
		},
		methods: {
			startDo:function(event){
				let ele = event.currentTarget;
				let id = ele.getAttribute("data-alerid");
				let index = ele.getAttribute("data-index");
				let paramsJson = {};
				let data = {"username":vueGetData.username}
				
				data["alert_id"] = id;
				data["update"] = 1;

				paramsJson["data"] = data;
				paramsJson["index"] = index;

		        vueGetData.getData("alertrecord",paramsJson,function(jsondata){
			        if(jsondata.body.error_code === 22000){
			        	// this.$store.dispatch('getAlarmtableList',this.alarmquerydata)
			        	this.$store.dispatch("startDoItem",paramsJson);
			        	vueGetData.creatTips("已经开始处理了");
		        	}	
		        }.bind(this),function(err){
		        	console.log(err);
		        }.bind(this));
		        // // }.bind(this),"http://192.168.217.22:8999/monitor/")
			}
		}
	}
</script>
