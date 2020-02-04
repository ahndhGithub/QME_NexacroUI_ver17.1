/**
*  @FileName 	Util.js 
*/

var pForm = nexacro.Form.prototype;
//var pForm = this;		// 탭 페이지 안에 있는 그리드의 경우 this로 하면 안 먹는다.

/**
 * @class
 * @param 
 * @param 
 * @return
 */
pForm.gtrace = function(strTrc,strPos)
{
	// 주석 처리 여부가 기능에 영향을 주어서는 안된다. 
	if ( pForm.gfn_isNull(strPos)				//strPos 없이 넘어 오면 무조건 찍는다.
 		||	strPos == "Grid.xjs.gfn_setGrid"				// 그리드 세팅
//  	||	strPos == "Grid.xjs._getUniqueId"				// 그리드의 유니크 아이디 가져오기
//		||	strPos == "Grid.xjs._getGridUserProperty"		//
//  	||	strPos == "Grid.xjs._gfnGridAddProp"			// userproperties , arrProp[i]값에 따라 sort-->objGrid.sort = 'true'--실행
//  	||	strPos == "Grid.xjs.gfn_grid_onheadclick"		// 그리드 헤드 클릭 (체크박스 : 전체선택 / 일반 : 정렬)
//  	||	strPos == "Grid.xjs._gfnHeadCheckSelectAll"		// 		-	체크박스 : 전체선택 / 전체해제)
// 		||	strPos == "Grid.xjs.gfn_grid_onrbuttondown"		// 그리드 우클릭 이벤트
//		||	strPos == "Grid.xjs._gfnMakeGridPopupMenu"		// 우클릭 팝업메뉴
//		||	strPos == "Grid.xjs.gfn_popupmenu_onmenuclick"	// 우클릭 팝업메뉴--메뉴클릭시
//		||	strPos == "Grid.xjs._gfnGridFilter"				// 필터설정
//		||	strPos == "Grid.xjs._gfnGridcellFix"
//		||	strPos == "Comm_GridFilter.xfdl.btn_filter_onclick"	// 필터적용 버튼
//		||	strPos == "Grid.xjs._gfnGridSetCssclass"		// 	틀고정 행 실행/해제
//		||	strPos == "Excel.xjs.gfn_excelExport"					// 엑셀 내보내기
// 		||	strPos == "Form_Work.xfdl.Button_onclick"
//		||	strPos == "Comm_SearchConditionFromTo.xfdl.form_onload"
//		||	strPos == "Comm_SearchConditionFromTo.xfdl.div_search_btn_onclick"
//		||	strPos == "Comm_SearchConditionFromTo.xfdl.EditFrom_onchanged"
//		||	strPos == "Comm_SearchConditionFromTo.xfdl.fn_popupCallback"
//		||	strPos == "Comm_SearchConditionFromTo.xfdl.ds_FromTo_oncolumnchanged"
// 		||	strPos == "PopupSalesOrder.xfdl.Form_onload"
// 		||	strPos == "PopupSaveLayout.xfdl.Form_onload"
// 		||	strPos == "PopupSalesOrder.xfdl.btn_ok_onclick"
// 		||	strPos == "Util_adh.xjs._getUserProperty"
// 		||	strPos == "POList.xfdl.Button_SortGroup_onclick"
// 		||	strPos == "POList.xfdl.callbackFunction"
// 		||	strPos == "Comm_SubSum.xfdl.form_onload"
//		||	strPos == "Comm_SubSum.xfdl.btn_ok_onclick"
//		||	strPos == "Comm_SubSum.xfdl.fn_getHeadTextAndBindingInfo"
//		||	strPos == "POList.xfdl.fn_reset"
//		||	strPos == "Util_adh.xjs.gfn_getAllInitData"
//		||	strPos == "Util_adh.xjs.gfn_callbackFunction"
//		||	strPos == "Frame.xjs.gfn_setLanguage"
//		||	strPos == "Comm_CrudButton.btnCrud_onclick"
//		||	strPos == "Comm_CrudButton.form_onload"
//		||	strPos == "Grid.xjs._gfnGridCheckboxNoStatusAdd"
// 		||	strPos == "Transaction.xjs.gfn_callback"
// 		||	strPos == "Transaction.xjs.gfn_transaction"
//  	||	strPos == "Grid.xjs.gfn_multiDatasetChanged"
//		||	strPos == "Comm_GridAddDelButton.form_onload"					
//  	||	strPos == "cmmGridAddDelButton.xfdl.btn_del_onclick"
//  	||	strPos == "Grid.xjs._gfn_getRowType"
// 		||	strPos == "cmmGridAddDelButton.xfdl.fn_deleteRow"
// 		||	strPos == "Validation.xjs.gfn_clearValidation"
//		||	strPos == "Validation.xjs.gfn_setValidation"
// 		||	strPos == "Validation.xjs.gfn_validation" 
// 		||	strPos == "Validation.xjs.gfn_validationCheckRule"
// 		||	strPos == "Message.xjs.gfn_alert"
// 		||	strPos == "Grid.xjs._gfnGridPasteEvent"
// 		||	strPos == "Grid.xjs.gfn_multiDatasetAdded"
// 		||	strPos == "Comm_CnC.xfdl.fn_reset"
// 		||	strPos == "Comm_CnC.xfdl.btn_ok_onclick"
// 		||	strPos == "PopupMultiSelect.xfdl.Form_onload"
// 		||	strPos == "PopupMultiSelect.xfdl.grd_list_onexpandup"
// 		||	strPos == "cmmGridAddDelButton.xjs.btn_GridFormat_onclick"
// 		||	strPos == "cmmGridAddDelButton.xfdl.fn_SaveLayoutPopup"
// 		||	strPos == "PopupSaveLayout.xfdl.fn_reset"
// 		||	strPos == "Comm_CrudButton.fn_setButtonVisEna"
// 		||	strPos == "Util_adh.xjs.gfn_commButtonAlignByVisible"
// 		||	strPos == "Util_adh.xjs.gfn_setUser"
// 		||	strPos == "Util_adh.xjs.gfn_getParentForm"
// 		||	strPos == "PopupSaveLayout.xfdl.callbackFunc_pop"
		||	strPos == "Comm_CalFromTo.xfdl.form_onload"

)	{
		trace(strPos+"--------->"+strTrc);
	}
};

