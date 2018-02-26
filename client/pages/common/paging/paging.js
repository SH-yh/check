import tool from '../../../res/third/tool.js';
const paging = (data, pagingSeting) => {
    const currentPage = pagingSeting.page;
    const skip = pagingSeting.skip;
    const splitSit = currentPage * skip;
    const endSit = skip + splitSit;
    const currentData = data.slice(splitSit, endSit);
    return currentData;
}
const handlePaging = function(dir){
    const pagingSeting = this.data.paging;
    const caseList = this.data.caseList;
    let { page, skip, pageSum } = pagingSeting;
    let currentPage;
    switch (dir) {
         case "prev":
            if (page > 0){
                currentPage =  page -1 ;
            }else{
                currentPage = 0;
                tool.showToast("亲！没有了哦！")
            }
            break;
        case "next":
            if (page < pageSum - 1) {
                currentPage = page + 1;
            } else {
                currentPage = pageSum - 1;
                tool.showToast("亲！没有了哦！");
            }
            break;
        default:
            break;
    }
    const currentPaging = {
        ...pagingSeting,
        page: currentPage
    };
    const currentList = paging(caseList, currentPaging);
    this.setData(
        {
            currentCaseList: currentList,
            paging: currentPaging
        }
    );
}
exports.paging = paging;
exports.handlePaging = handlePaging;