    // 文件下载带异常信息
    // downLoadhandler(obj, fileName) {
    //     let tempBlob = new Blob([obj]),
    //         reader = new FileReader();
    //     reader.onload = e => {
    //         let result = e.target.result;
    //         try {
    //             let json = JSON.parse(result);
    //             if (json) {
    //                 message.error(json.message);
    //                 return false;
    //             }
    //         } catch (err) {

    //         }
    //         let url = window.URL.createObjectURL(tempBlob);
    //         let link = document.createElement('a');
    //         link.style.display = 'none';
    //         link.href = url;
    //         link.setAttribute('download', fileName);
    //         document.body.appendChild(link);
    //         link.click();
    //         link.remove();
    //     }
    //     reader.readAsText(tempBlob)
    // }
