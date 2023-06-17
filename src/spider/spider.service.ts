import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SpiderService {
  //   获取学院列表
  async getCollegeList() {
    let { data } = await axios.request({
      url: 'https://jwmis.ncwu.edu.cn/hsjw/frame/droplist/getDropLists.action',
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: {
        comboBoxName: 'MsYXB',
        paramValue: 'nj=2023',
      },
    });
    let collegeList = data.map((item: any) => {
      return {
        label: item.name,
        value: item.name,
        code: item.code,
      };
    });

    return { result: collegeList };
  }

  //   获取专业列表
  async getMajorList(code: string) {
    let { data } = await axios.request({
      url: 'https://jwmis.ncwu.edu.cn/hsjw/frame/droplist/getDropLists.action',
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: {
        comboBoxName: 'MsYXB_Specialty',
        paramValue: `nj=2022&dwh=${code}`,
      },
    });
    let collegeList = data.map((item: any) => {
      return {
        label: item.name,
        value: item.name,
        code: item.code,
      };
    });

    return { result: collegeList };
  }
}
