//index.js
const app = getApp()

Page({
  data: {
    title: '',
    imageurl: ''
  },
  getSum() {
    wx.cloud.callFunction({
      name: "getSum",
      data: {
        a: 20,
        b: 50
      },
      success(res) {
        console.log(res)
      }
    })
  },
  getRunData(e) {
    wx.getWeRunData({
      success: (result) => {
        const cloudId = result.cloudID
        wx.cloud.callFunction({
          name: "getwerun",
          data: {
            runData: wx.cloud.CloudID(cloudId)
          },
          success(res) {
            console.log(res)
          }
        })
      }
    })
  },

  getBooks() {
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
        wx.cloud.callFunction({
          name:"getBooks",
          data:{
            isbn: res.result
          },
          success: (result) => {
            console.log(result)
            this.setData({
              imageurl: result.result.coverurl,
              title: result.result.title
            })
          }
        })
      }
    })
  },
  onLoad: function() {
    
  }
})
