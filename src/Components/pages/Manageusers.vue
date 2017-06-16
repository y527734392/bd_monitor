<template>
	<div class="SideRight">
		<div class="manage-main">
			<div class="topbox">
				<div class="manageTop">
					<span class="nowrap">
						<label for="search-type">管理类别</label>
						<select id="search-type" class="manage-select" v-model="formInitData.searchTypesSelectID" @change="getTableList(formInitData.searchTypesSelectID)">
							<option v-for="(value,index) in formInitData.searchType" :value="index">{{value}}</option>
						</select>
					</span>
				</div>
			</div>
			<!-- 列表部分 -->
			<div class="configList">
				<keep-alive>
					<component :is="dynamics"></component>
				</keep-alive>
			</div>
		</div>
	</div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
import vueGetData from "../../Js/vueGetData.js"
import NoPermission from "../tables/NoPermission.vue"
import UserInfo from "../pages/UserInfo.vue"
import ManageAlertGroup from "../tables/ManageAlertGroup.vue"
import ManageCertiGroup from "../tables/ManageCertiGroup.vue"

	export default{
		name:'ManageUserTop',
		data(){
			return {
				formInitData:{
					searchTypesSelectID:0,
					searchType:["请选择管理类别","用户管理","报警组管理","权限组管理"],
					itemname:""
				},
				dynamics: "",	//动态组件
			}
		},
		computed:mapGetters({
			userList:"userinfolist",
		}),
		methods: {
			getTableList:function(n){
				n ? n : 0;
				let datas = {
					"username":vueGetData.username(),
					"type": 4,
				};
				if(n==0){
					this.dynamics = "";
				}else if(n==1){
					this.$store.dispatch('getUserinfolist',datas);
					console.log(this.userinfolist);
					this.dynamics = "UserInfo";
				}else if(n==2){
					this.$store.dispatch('getAlertemanagelist',datas);
	    		    vueGetData.getData("alertmanage",datas,function(jsondata){
	    		    	console.log(datas);
		            	if(jsondata.body.error_code === 22001){
	         				this.dynamics = "NoPermission";
	         				return false;
	         			}else{
	         				this.dynamics = "ManageAlertGroup";
	         			}
	         		}.bind(this),function(){

	         		}.bind(this));
				}else if(n==3){
					this.$store.dispatch('getCertificatemanagelist',datas);
					vueGetData.getData("certificatemanage",datas,function(jsondata){
		            	if(jsondata.body.error_code === 22001){
	         				this.dynamics = "NoPermission";
	         				return false;
	         			}else{
	         				this.dynamics = "ManageCertiGroup";
	         			}
	         		}.bind(this),function(){

	         		}.bind(this));
				}
			},
		},
		components: {
			NoPermission,
			ManageAlertGroup,
			ManageCertiGroup,
			UserInfo,
		}

	  }
</script>