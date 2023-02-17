<template>
  <!-- header -->
  <div class="nav-container page-component">
    <!--左侧导航 #start -->
    <div class="nav left-nav">
      <div class="nav-item ">
        <span class="v-link clickable dark" onclick="javascript:window.location='/user'">实名认证 </span>
      </div>
      <div class="nav-item ">
        <span class="v-link selected dark" onclick="javascript:window.location='/order'"> 挂号订单 </span>
      </div>
      <div class="nav-item ">
        <span class="v-link clickable dark" onclick="javascript:window.location='/patient'"> 就诊人管理 </span>
      </div>
      <div class="nav-item selected">
        <span class="v-link clickable dark" onclick="javascript:window.location='/bingli'"> 病例记录 </span>
      </div>

      <div class="nav-item ">
        <span class="v-link clickable dark"> 修改账号信息 </span>
      </div>
      <div class="nav-item ">
        <span class="v-link clickable dark"> 意见反馈 </span>
      </div>
    </div>
    <!-- 左侧导航 #end -->
    <!-- 右侧内容 #start -->
    <div class="page-container">
      <div class="personal-order">
        <div class="title"> 病例记录</div>
        <el-form :inline="true">
          <el-form-item label="就诊人：">
            <el-select v-model="searchObj.patientId" placeholder="请选择就诊人" class="v-select patient-select">
              <el-option
                v-for="item in patientList"
                :key="item.id"
                :label="item.name + '【' + item.certificatesNo + '】'"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开药状态：" style="margin-left: 80px">
            <el-select v-model="list.prescriptionStatus" placeholder="全部" class="v-select patient-select" style="width: 200px;">
              <el-option
                v-for="item in statusList"
                :key="item.status"
                :label="item.comment"
                :value="item.status">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="text" class="search-button v-link highlight clickable selected" @click="fetchData()">
              查询
            </el-button>
          </el-form-item>
        </el-form>
        <div class="table-wrapper table">
          <el-table
            :data="list"
            stripe
            style="width: 100%">
            <el-table-column
              label="就诊时间"
              width="120">
              <template slot-scope="scope">
                {{ scope.row.reserveDate }} {{ scope.row.reserveTime === 0 ? '上午' : '下午' }}
              </template>
            </el-table-column>
            <el-table-column
              prop="hosname"
              label="医院"
              width="100">
            </el-table-column>
            <el-table-column
              prop="depname"
              label="科室">
            </el-table-column>
            <el-table-column
              prop="title"
              label="医生">
            </el-table-column>
            <el-table-column
              prop="disease"
              label="疾病名称">
            </el-table-column>
            <!-- <el-table-column
              prop="medicine"
              label="所开处方药">
            </el-table-column> -->
            <el-table-column
              prop="medicalExpenses"
              label="医药费">
            </el-table-column>
            <el-table-column
              prop="patientName"
              label="就诊人">
            </el-table-column>
            <el-table-column
              prop="prescriptionStatus"
              label="开药状态">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" class="v-link highlight clickable selected" @click="show(scope.row.orderId)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <el-pagination
          class="pagination"
          layout="prev, pager, next"
          :current-page="page"
          :total="total"
          :page-size="limit"
          @current-change="fetchData">
        </el-pagination>
      </div>
    </div>
    <!-- 右侧内容 #end -->
  </div>
  <!-- footer -->
</template>
<script>
import '~/assets/css/hospital_personal.css'
import '~/assets/css/hospital.css'
import orderInfoApi from '@/api/orderInfo'
import patientApi from '@/api/patient'
import caseApi from '@/api/case'

export default {
  data() {
    return {
      list: [], // banner列表
      total: 0, // 数据库中的总记录数ss
      page: 1, // 默认页码
      limit: 10, // 每页记录数
      searchObj: {}, // 查询表单对象
      patientList: [],
      statusList: [],
      orderList: [],
      //病例的元素
      CasesList: [],

      myOrderId: [],

    }
  },
  created() {
    this.orderId = this.$route.query.orderId
    this.findCasesList()
    this.findPatientList()
    this.getStatusList()
    this.fetchData()

  },

  methods: {


    //查询病例集合
    findCasesList() {
      caseApi.findList(this.page, this.limit).then(response => {
      this.casesList = response.data.records
      })
    },

    fetchData(page = 1) {
      this.page = page
      orderInfoApi.getPageList(this.page, this.limit, this.searchObj).then(response => {
        this.orderList = response.data.records
        this.total = response.data.total
        this.list = this.assiginObj(this.orderList, this.casesList)
        //晚上测试一下
      })
    },

    //合并
    assiginObj(target = {},sources= {}){
    let obj = target;
    if(typeof target != 'object' || typeof sources != 'object'){
        return sources; // 如果其中一个不是对象 就返回sources
    }
    for(let key in sources){
        // 如果target也存在 那就再次合并
        if(target.hasOwnProperty(key)){
            obj[key] = this.assiginObj(target[key],sources[key]);
        } else {
            // 不存在就直接添加
            obj[key] = sources[key];
        }
    }
    return obj;
},

    findPatientList() {
      patientApi.findList().then(response => {
        this.patientList = response.data
      })
    },
    //合并订单和病例数据
    // mergeData(){
    //   console.log("1ffffffffffff");
    //   // this.list = {...this.orderList, ...this.casesList};
    //   // this.list = Object.assign(this.orderList, this.casesList)
    //   //TODO 合并
    //   this.list = this.assiginObj(this.orderList, this.casesList)
    //   console.log(this.list);
    // },


    getStatusList() {
      orderInfoApi.getStatusList().then(response => {
        this.statusList = response.data
      })
    },
    changeSize(size) {
      this.limit = size
      this.fetchData(1)
    },
    show(orderId) {
      window.location.href = '/bingli/show?orderId=' + orderId
    }
  }
}
</script>
