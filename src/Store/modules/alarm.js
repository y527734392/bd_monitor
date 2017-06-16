import * as  types from '../mutation-types.js'
import vueGetData from "../../Js/vueGetData.js"

 //定义变量
const state = {
    alarmlist:[],
    alarAllpage:null,
    alarTableTotal: null,
    runloglist:[],
    runlogAllpage:null,
    runlogTableTotal: null,
    alarmquerydata:{},
    runlogquerydata:{}
}

//事件处理：异步请求、判断、流程控制
const actions = {
    getAlarmquerydata:function({commit},paramsJson){
        var data = paramsJson;
        commit(types.ALARMQUERYDATA,data);
    },
    getRunlogquerydata:function({commit},paramsJson){
        var data = paramsJson;
        commit(types.RUNLOGQUERYDATA,data);
    },
    // getRunlogquerydata:function({commit},paramsJson){
    //     let data = {};
    //     if(paramsJson.origin){
    //         data = paramsJson.origin
    //         let start = paramsJson.start;
    //         if(start){ //start
    //             data["start"] = start;
    //         }
    //     }else{
    //         data = paramsJson;
    //     }
    //     commit(types.RUNLOGQUERYDATA,data);
    // },
    //获取表格数据
    getAlarmtableList:function({commit},paramsJson){
        let json = {};
        for(let key in paramsJson){
            if(!(key == "product_line" && paramsJson[key] == -1)){
                json[key] = paramsJson[key];
            } 
        }
        vueGetData.getData("alertrecord",json,function(jsondata){
            if(jsondata.body.error_code === 22000){
                let list = jsondata.body.data;
                let count = parseInt(jsondata.body.count);
                let total = Math.ceil(count/20);
                commit(types.ALARMLIST,{list,total,count});
            }   
        },function(err){
            console.log(err)
        })
    },
    //获取运行记录表格数据
    getRunlogtableList:function({commit},paramsJson){
        let json = {};
        for(let key in paramsJson){
            if(!(key == "product_line" && paramsJson[key] == -1)){
                json[key] = paramsJson[key];
            } 
        }
        vueGetData.getData("runrecord",json,function(jsondata){
            if(jsondata.body.error_code === 22000){
                let list = jsondata.body.data;
                let count = parseInt(jsondata.body.count);
                let total = Math.ceil(count/20);
                commit(types.RUNLOGLIST,{list,total,count});
            }   
        },function(err){
            console.log(err)
        })
    },
    //开始处理后修改状态
    startDoItem: function({commit},paramsJson) {
        let data = paramsJson.data;
        let index = paramsJson.index;
        vueGetData.postData("alertrecord",data,function(jsondata){
            if(jsondata.body.error_code === 22000){
                commit(types.UPDATEALARMINDEX,index)
            }   
        },function(err){
            console.log(err);
        })
    }

}
//处理状态、数据的变化
const mutations = {
    [types.ALARMLIST](state , params){
        state.alarmlist = params.list;
        state.alarAllpage = params.total;
        state.alarTableTotal = params.count;
    },
    [types.RUNLOGLIST](state , params){
        state.runloglist = params.list;
        state.runlogAllpage = params.total;
        state.runlogTableTotal = params.count;
    },
    [types.ALARMQUERYDATA](state , data){
        state.alarmquerydata = data;
    },
    [types.RUNLOGQUERYDATA](state , data){
        state.runlogquerydata = data;
    },
    [types.UPDATEALARMINDEX](state , index){
        let a = state.alarmlist[index];
        a.process_status = 1;
        state.alarmlist.splice(index,1,a);
    }
}

//导出数据
const getters = {
    alarmlist(state){
        return state.alarmlist;
    },
    alarAllpage(state){
        return state.alarAllpage;
    },
    alarTableTotal(state){
        return state.alarTableTotal;
    },

    runloglist(state){
        return state.runloglist;
    },
    runlogAllpage(state){
        return state.runlogAllpage;
    },
    runlogTableTotal(state){
        return state.runlogTableTotal;
    },

    alarmquerydata(state){
        return state.alarmquerydata;
    },
    runlogquerydata(state){
        return state.runlogquerydata;
    }
}

export default{
    state,
    actions,
    mutations,
    getters
}