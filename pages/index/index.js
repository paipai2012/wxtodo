//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    items: {},
    userInfo: {}
  },
  addItemSubmit:function(e){
    var item = e.detail.value
    item.is_complete = false;
    var items = wx.getStorageSync('items') || []
    items.unshift(item)
    wx.setStorageSync('items', items)
    this.setData({
      items:items || []
    })
  },
  changeItem:function(e){
    var that = this
    var itemindex = e.target.dataset.itemindex
    that.data.items.forEach(function (value, index, ar) {
      if(itemindex == index){
        ar[index].is_complete = !ar[index].is_complete;
      }
    });
    this.setData({
      items:that.data.items || []
    })
    wx.setStorageSync('items', that.data.items)
  },
  onLoad: function () {
    var that = this
    that.setData({
      items:wx.getStorageSync('items') || []
    })
  	//调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
      that.update()
    })
  }
})
