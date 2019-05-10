import login from "@/pages/login";
import classManger from "@/pages/classManger";
import home from "@/pages/home";
import addExam from "@/pages/addExam";
import paging from "@/pages/paging";
import userrole from "@/pages/role";
import selectExam from "@/pages/selectExam";
import classmanagement from "@/pages/classManagement";
import creatTest from "@/pages/creatTest";
import Ment from "@/pages/mangMent"
import examination from "@/pages/examination";
import classmen from "@/pages/classMen";
import adduser from "@/pages/adduser";
import examDetail from "@/pages/examDetail";
import classdetail from '@/pages/classdetail';
import Student from "@/pages/student"
import show from "@/pages/show";
import showuser from "@/pages/showuser";
import testist from '@/pages/testlist';//试卷列表接口
import testdetail from '@/pages/testdetail';
import showidentity from "@/pages/showidentity";
import exampaper from "@/pages/exampaper";
import addClass from "@/pages/addClass";

import showapi from "@/pages/showapi";
import showuserapi from "@/pages/showuserapi";

const routers = [
  {
    path: "/",
    component: login,
    exact: true
  },
  {
    path: "/exam",
    component: home,
    child: [
      {
        path: "/exam/role",
        component: userrole
      },
      {
        path: "/exam/ment",
        component: Ment

      },
      {
        path: "/exam/questions",
        component: addExam
      },
      {
        path: "/exam/exams",
        component: paging
      },
      {
        path: "/exam/userrole",
        component: userrole
      },
      {
        path: "/exam/getQuestionsType",
        component: selectExam
      },
      {
        path: "/exam/subject",
        component: classmanagement
      },
      {
        path: "/exam/examType",
        component: classManger
      },
      {
        path: "/exam/creatTest",
        component: creatTest
      },
      {
        path:'/exam/addClass',
        component:addClass
      },
      {
        path: "/exam/examination",
        component: examination
      },
      {
        path: "/exam/classmen", //班级分类
        component: classmen
      },
      {
        path: "/exam/add",
        component: adduser
      },
      {
        path:"/exam/student",
        component:Student

      },
      {
        path: "/exam/examDetail",
        component: examDetail
      },
      {
        path: "/exam/exampaper",
        component: exampaper
      },
      {
        path:'/exam/classdetail',
        component:classdetail,
      },{
        path: "/exam/show",
        component: show,
        child: [
          {
            path: "/exam/show/user",
            component: showuser
          },{
            path: "/exam/show/identity",
            component: showidentity
          },
          {
            path: "/exam/show/api",
            component: showuserapi
          },
          {
            path: "/exam/show/userapi",
            component: showuserapi
          }
        ]
        
      },
      {
        path: "/exam/testlist",
        component: testist
      },
      {
        path: "/exam/testdetail",
        component: testdetail
      }
    ]
  },

  {
    path: "/student/login",
    component: login
  }
];

export default routers;
