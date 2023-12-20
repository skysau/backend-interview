
class Utils {
  prepareRes(status, datas) {
    const data= {
      status:status,
      data:datas,
    };
    return data;
  }

}

module.exports = new Utils();