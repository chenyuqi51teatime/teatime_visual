<template>
  <div class="visual">

    <div class="picture_show">

      <div class="add_picture" v-if='!images'>
        <span>+</span>
      </div>

      <input id="file" @change="c($event)" type="file">

      <img v-if='images' @click='submit' :src="images" class="img_size">
    </div>
    
    <button id="btn-confirm" class="hello-btn-big btn-confirm" @click='submit'>检测</button>

    <div class="result">

    </div>

  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
  import { Indicator } from 'mint-ui';
  import axios from 'axios'
  import $ from 'jquery'

  export default {
    name: 'visual',
    data() {
      return {
        images: '', // 图片路径
        imagesFile: '', // 图片文件
        DetectionResults: '', // 检测返回数据
      }
    },
    methods: {
      c(e) {
        var _this = this;

        if (e.target.files.length > 1) return MessageBox.alert('只能选择单张图片!');

        var windowURL = window.URL || window.webkitURL; // 创建图片路径

        this.images = windowURL.createObjectURL(event.target.files[0]); // 展示图片

        var r = new FileReader();

        var f = document.getElementById('file').files[0];

        r.readAsDataURL(f);

        r.onload = function (e) {

          var re = this.result;

          // _this.imagesFile = this.result; // base64 文件编码
          _this.canvasDataURL(re, 500)
        }

      },
      canvasDataURL(re, w, objDiv) {

        var _this = this;

        var newImg = new Image();

        newImg.src = re;

        var imgWidth, imgHeight, offsetX = 0, offsetY = 0;

        newImg.onload = function () {
          var img = document.createElement("img");
          img.src = newImg.src;
          imgWidth = img.width;
          imgHeight = img.height;
          var canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = w;
          var ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, w, w);
          if (imgWidth > imgHeight) {
            imgWidth = w * imgWidth / imgHeight;
            imgHeight = w;
            offsetX = -Math.round((imgWidth - w) / 2);
          } else {
            imgHeight = w * imgHeight / imgWidth;
            imgWidth = w;
            offsetY = -Math.round((imgHeight - w) / 2);
          }

          ctx.drawImage(img, offsetX, offsetY, imgWidth, imgHeight);

          var base64 = canvas.toDataURL("image/jpeg", 0.7);

          // console.log(base64)

          _this.imagesFile = base64

          // if (typeof objDiv == "object") {
          //   objDiv.appendChild(canvas);
          // } else if (typeof objDiv == "function") {
          //   objDiv(base64);
          // }
        }
      },
      submit(event) {

        event.preventDefault();

        Indicator.open('加载中...');

        var _this = this;

        var base = _this.imagesFile.split(',')[1]

        // console.log(base)

        // alert(base)

        $.ajax({
          url: 'https://testshop.51teatime.com/v2/other/recognition/image',

          type: "POST",

          data: {
            imageFile: base,
          },

          dataType: "json",

          success: function (data) {
            // console.log(data)
            Indicator.close();

            _this.DetectionResults = data.name;


            var txt1 = $("<div></div>").text("检测结果:");

            var txt2 = $("<div></div>").text(data.name);

            $(".result").html('');

            $(".result").prepend(txt1, txt2);

            return;
          },

          error: function (err) {

            Indicator.close();

            var txt1 = $("<div></div>").text("检测结果:");

            var txt2 = $("<div></div>").text("未检测到商品!");

            $(".result").html('');

            $(".result").prepend(txt1, txt2);

            MessageBox.alert('未检测到商品!');
            return;
          }
        });

      },
    },
  }
</script>

<style scoped>
  .visual {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  /*  图片show  */

  .picture_show {
    margin: 30px auto 0;
    padding: 20px 40px;
    box-sizing: border-box;
    width: 90%;
    min-height: 240px;
    border: 1px solid #888;
    border-radius: 20px;
    position: relative;
  }

  /* 添加图片按钮 */

  .add_picture {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 70px;
    height: 70px;
    line-height: 70px;
    text-align: center;
    border-radius: 20px;
    /* border: 1px solid #ccc; */
    font-size: 80px;
    color: #ccc;
  }

  /* 添加图片 input */

  #file {
    display: block;
    width: 100%;
    height: 100%;
    border: 1px solid red;
    vertical-align: top;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

  /*  检测按钮  */

  .visual_btn {
    margin: 25px auto 20px;
    width: 100px;
    height: 46px;
    line-height: 46px;
    text-align: center;
    border-radius: 8px;
    background: #f5d601;
    color: white;
    border: none;
    font-size: 18px;
    font-weight: 600;
  }

  .hello-btn-big {
    margin: 25px auto 20px;
    width: 100px;
    height: 46px;
    color: #fff;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 600;
  }

  /*  图片style  */

  .img_size {
    display: block;
    margin: auto;
    width: 100%;
    /* height: 100%; */
  }
</style>