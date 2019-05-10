import "./index.css";
import dva from 'dva';
import usern from './model/usen.js'
import classall from "../src/z_model/classall";
import "antd/dist/antd.css";
import smodel from '@/models/syhmodel'
import demo from './model/demo'
const app = dva();
app.model(usern)
app.model(smodel);
app.model(demo);
app.model(classall);
app.router(require("./routers").default);
app.start("#root");
