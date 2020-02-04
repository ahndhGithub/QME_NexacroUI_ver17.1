/**
*  @FileName 	QmeNexa.xjs 
*/

var pForm = nexacro.Form.prototype;

pForm._getUserProperty = function (obj,userPropertyName)
{
															var gtrcPos	= "Util_adh.xjs._getUserProperty";
	var sEvVal = obj+"."+userPropertyName;				this.gtrace("sEvVal --->"+sEvVal, gtrcPos);
	var sProp = eval(sEvVal);							this.gtrace("sProp --->"+sProp, gtrcPos);
 	var arrprop = sProp.split(",");

 	return arrprop;
														this.gtrace("------------------------------------------end------------------------------------------", gtrcPos);
};

/*********************************************************************************************
 * @type   : function
 * @access : public
 * @desc   : 현재 플랫폼의 OS종류를 구한다.
 * @param  : 
 * @return :
 *********************************************************************************************/
pForm.gfn_getOS = function ()
{
	var osVersion = system.osversion;
	
	//trace("osVersion[" + osVersion + "]")

	if ( this.gfn_isNull(osVersion) )
		return "ETC";
	
	osVersion = osVersion.toUpperCase();
		
	if ( osVersion.indexOf("ANDROID") >= 0 )	// android 
	{
		return "ANDROID";
	}
	else if ( osVersion.indexOf("IOS") >= 0 )
	{
		return "IOS";
	}
	else if ( osVersion.indexOf("WINDOWS") >= 0 )
	{
		return "WINDOWS";
	}
	else if ( osVersion.indexOf("MAC") >= 0 )
	{
		return "MAC";
	}
	else if ( osVersion.indexOf("LINUX") >= 0 )
	{
		return "LINUX";
	}
	else
	{
		return "ETC";
	}
}

/*********************************************************************************************
 * @type   : function
 * @access : public
 * @desc   : 애플리케이션이 실행되는 환경 정보를 구한다.
 * @param  : 
 * @return :
 *********************************************************************************************/
pForm.gfn_getNavigator = function ()
{
	var osNavigatorname = system.navigatorname;
	
	//trace("osVersion[" + osVersion + "]")

	if ( this.gfn_isNull(osNavigatorname) )
		return "NOT_DEFINE";
	
	osNavigatorname = osNavigatorname.toUpperCase();
	
	return osNavigatorname;
// 	if ( osNavigatorname.indexOf("ANDROID") >= 0 )	// android 
// 	{
// 		return "ANDROID";
// 	}
// 	else if ( osNavigatorname.indexOf("IOS") >= 0 )
// 	{
// 		return "IOS";
// 	}
// 	else if ( osNavigatorname.indexOf("WINDOWS") >= 0 )
// 	{
// 		return "WINDOWS";
// 	}
// 	else
// 	{
// 		return "ETC";
// 	}
}

/*********************************************************************************************
 * @type   : function
 * @access : public
 * @desc   : 현재 전체 경로를 가지고온다.
 * @param  : obj 현재 obj
 * @return :
 *********************************************************************************************/
pForm.gfn_getObjPath = function (obj)
{
	var arrPath = new Array();
	var tmpObj = obj;
	var cnt = 1;

	arrPath[0] = tmpObj.name;
	while (true) 
	{
		if (tmpObj.parent == "[object ChildFrame]") 
		{
			arrPath[cnt-1] = "application.mainframe.childframe.form";
			break;
		}

		arrPath[cnt] = tmpObj.parent.name;
		tmpObj = tmpObj.parent;
		cnt++;
	}

	var path = "";
	for (var i = arrPath.length - 1; i >= 0; i--) 
	{
		path += arrPath[i] + ".";
	}

	return path;
}

/*++
@desc	온로드 이벤트, 필요한 모든 데이터 가져옴
		-	콤보 , 권한 , 유저 , ...
*/
pForm.gfn_getAllInitData = function()
{
																		var gtrcPos = "Util_adh.xjs.gfn_getAllInitData";
	//html로부터 전달받은값, 브라우져정보
	var sQMELOGONUSERID = 	nexacro.getApplication().QmeLogonUserId;		this.gtrace("sQMELOGONUSERID--->"+sQMELOGONUSERID,gtrcPos);
	var sLANGUAGEKEY	=	nexacro.getApplication().LanguageKey;       	this.gtrace("sLANGUAGEKEY--->"+sLANGUAGEKEY,gtrcPos);
	var sNAVIGATOR		=	this.gfn_getNavigator();						this.gtrace("sNAVIGATOR---->"+sNAVIGATOR,gtrcPos);
																			this.gtrace("this.gfn_getNavigator()--->"+this.gfn_getNavigator(),gtrcPos);		//NEXACRO / IE / CHROME
	{	//	gds_QmeLogonInfo 데이터셋 세팅
		if(this.gfn_getNavigator()=="NEXACRO"){	//	넥사크로 전용브라우져 실행시 - 테스트용 데이터
				this.gtrace("nexacro.getApplication().gds_QmeLogonInfo.rowcount--->"+nexacro.getApplication().gds_QmeLogonInfo.rowcount,gtrcPos);
// 			if(nexacro.getApplication().gds_QmeLogonInfo.rowcount==0)
// 			{
				//무조건 트랜잭션
				this.gtrace("nexacro전용브라우져--TRANSYES", gtrcPos);
				nexacro.getApplication().gds_QmeLogonInfo_in.clearData();
				nexacro.getApplication().gds_QmeLogonInfo_in.addRow();
				nexacro.getApplication().gds_QmeLogonInfo_in.setColumn(0, "p_user_id", "160307");
				nexacro.getApplication().gds_Language_in.clearData();
				nexacro.getApplication().gds_Language_in.addRow();
				nexacro.getApplication().gds_Language_in.setColumn(0, "p_country_cd", "KO");		//	한국 : KO / 베트남 : VI / 인도네시아 : ID

// 			}else{
// 				this.gtrace("nexacro전용브라우져--NOTRANS", gtrcPos);
// 				
// 				this.gfn_onloadSequence();
// 				
// 				return;
// 			}
		}else{
			//	QME기존시스템에서 띄운 경우 == 무조건 QmeLogonUserId값이 있다고 정의
			//	QmeLogonUserId값이 있다면 초기세팅트랜잭션 실행 : UserId를 넘김
			if(!this.gfn_isNull(sQMELOGONUSERID))
			{
				nexacro.getApplication().gds_QmeLogonInfo_in.clearData();
				nexacro.getApplication().gds_QmeLogonInfo_in.addRow();
				nexacro.getApplication().gds_QmeLogonInfo_in.setColumn(0, "p_user_id", sQMELOGONUSERID);
				nexacro.getApplication().gds_Language_in.clearData();
				nexacro.getApplication().gds_Language_in.addRow();
				nexacro.getApplication().gds_Language_in.setColumn(0, "p_country_cd", sLANGUAGEKEY);
			}else{
				alert("비정상접근URL--QMELOGONUSERID없음");
				this.close();
				return;
			}
		}
	}
	
	//	파람세팅+트랜잭
	{
		var sSvcID = "getAllInitData";
		//	var sURL = "AppSvrLocalMsSql::CommonSaveAction_Return.do";
		var sURL = "AppSvr::common/commonAction.ppc";
		var sInDatasets 	= "";
		var sOutDatasets 	= "";
		var sArguments 		= "";
		
		var iSeq = 0;													//	트랜잭션의 Argument에서는 nexacro.getApplication... 안 붙여도 된다 ?
// 		if (nexacro.getApplication().gds_User.rowcount 		== 0)	{sArguments+="UserMapper.getLoginInfo "; 	sInDatasets+="ds_in"+iSeq+"=gds_QmeLogonInfo "; 	sOutDatasets+="gds_User=ds_out"+iSeq+" "; 		iSeq++;}
//   	if (nexacro.getApplication().gds_word.rowcount 		== 0)	{sArguments+="SqlId_00004 "; 	sInDatasets+="ds_in"+iSeq+"=gds_QmeLogonInfo ";	sOutDatasets+="gds_word=ds_out"+iSeq+" "; 		iSeq++;}
		
									this.gtrace("gds_User.rowcount--->"+this.gfn_getApplication().gds_User.rowcount, gtrcPos);
		if(this.gfn_getApplication().gds_User.rowcount == 0 )
		{	// 사용자로그인정보 가져오기 : 있다면 스킵 ( ex. 팝업 )
			sArguments+="UserMapper.getLoginInfo "; 	sInDatasets+="ds_in"+iSeq+"=gds_QmeLogonInfo_in"+" "; 	sOutDatasets+="gds_User=ds_out"+iSeq+" "; 			iSeq++;	//	this.gtrace("iSeq-->"+iSeq, gtrcPos);		
		}
		
									this.gtrace("gds_Language.rowcount--->"+this.gfn_getApplication().gds_Language.rowcount, gtrcPos);
		if(this.gfn_getApplication().gds_Language.rowcount == 0 )
		{	// 언어 가져오기
			sArguments+="CommonMapper.getMultiLang "; 	sInDatasets+="ds_in"+iSeq+"=gds_Language_in"+" ";	sOutDatasets+="gds_Language=ds_out"+iSeq+" "; 			iSeq++;	//	this.gtrace("sArguments-->"+sArguments, gtrcPos);
		}
		
		{	//공통코드정보 가져오기 인풋 추가
			var arrCmmCode;
			if(!this.gfn_isNull(this.COMBO_SET_STR))
			{	// COMBO_SET_STR이 없다면 스킵
				arrCmmCode = this.COMBO_SET_STR.split(" ");
													//	this.gtrace("arrCmmCode.length--->"+arrCmmCode.length, gtrcPos);
					for(var k = 0 ; k < arrCmmCode.length ; k++){
						var tCmmStr = arrCmmCode[k].trim();
						if(tCmmStr !="") {
							var tArr = tCmmStr.split("#");						//	this.gtrace("arrCmmCode["+k+"]--->"+arrCmmCode[k], gtrcPos);
																				//	this.gtrace("tArr[0]--->"+tArr[0], gtrcPos);
																				//	this.gtrace("tArr[1]--->"+tArr[1], gtrcPos);
							var tCommInDs = new Dataset;
								var tCommInDsName = "tCommInDs"+k;
								this.addChild(tCommInDsName, tCommInDs); 
								tCommInDs.copyData(nexacro.getApplication().gds_CommCodeIn);
								tCommInDs.setColumn(tCommInDs.addRow(), "p_code_grp", tArr[1]);
								
								switch(tArr[1]){	// 특이로직
									case "CURRENCY" :	tCommInDs.setColumn(0, "p_sub_cd1", "T");	// 통화
												break;
									default : break;
								}

								sArguments	+=	"CommonMapper.getCodeInfo"		+" ";	//	this.gtrace("sArguments-->"+sArguments, gtrcPos);
								sInDatasets	+=	"ds_in"+iSeq+"="+tCommInDsName	+" ";
								sOutDatasets+=	tArr[0]+"=ds_out"+iSeq			+" ";
								iSeq++;
						}
					}
				}
		}
//   		sArguments+="CommonMapper.getCodeInfo "; 	sInDatasets+="ds_in"+iSeq+"=gds_QmeLogonInfo ";		sOutDatasets+="gds_CommCode=ds_out"+iSeq+" "; 	iSeq++;
//   		sArguments+="CommonMapper.getCodeInfo "; 	sInDatasets+="ds_in"+iSeq+"=gds_QmeLogonInfo ";		sOutDatasets+="gds_CommCode=ds_out"+iSeq+" "; 	iSeq++;

// 		if (nexacro.getApplication().gds_MsgSet.rowcount 	== 0)	{sArguments+="getMsgSet "; 		sInDatasets+="ds_in"+iSeq+"=gds_QmeLogonInfo ";	sOutDatasets+="gds_MsgSet=ds_out"+iSeq+" "; 	iSeq++;}
// 		if (nexacro.getApplication().gds_Logon.rowcount 	== 0)	{sArguments+="getLogon "; 		sInDatasets+="ds_in"+iSeq+"=gds_QmeLogonInfo ";	sOutDatasets+="gds_Logon=ds_out"+iSeq+" "; 		iSeq++;}
																									//	this.gtrace("nexacro.getApplication().gds_User-->"+nexacro.getApplication().gds_User.saveXML(), gtrcPos);
																										this.gtrace("sInDatasets-->"+sInDatasets, gtrcPos);
																										this.gtrace("sOutDatasets-->"+sOutDatasets, gtrcPos);
		{	// 	
			var tFormatInDs = new Dataset;
				var tFormatInDsName = "tFormatInDs";
				this.addChild(tFormatInDsName, tFormatInDs); 
				tFormatInDs.copyData(this.gfn_getApplication().gds_FormatInOutDs);
				tFormatInDs.addRow();
				this.gfn_setUser(tFormatInDs, "USERID");
				tFormatInDs.setColumn(0, "PROGRAMID", this.name);
					//	this.gtrace("tFormatInDs.saveXML()-->"+tFormatInDs.saveXML(), gtrcPos);
					// 	sArguments+="formatSearchOnload "; 
					// 	sInDatasets+="ds_in"+iSeq+"=tFormatInDs"+" ";
					// 	sOutDatasets+="tFormatInDs=ds_out"+iSeq;
					//	this.transaction(sSvcID, sURL, sInDatasets, sOutDatasets, sArguments, "gfn_callbackFunction");
// 			this.transaction( "formatSearchOnload"
// 								, "AppSvrLocalMsSql::CommonSaveAction_Return.do"
// 								, "ds_in0=tFormatInDs"
// 								, "tFormatInDs=ds_out0"
// 								, "sqlId=" + nexacro.wrapQuote("formatSearchOnload")
// 								, "gfn_callbackFunction");
		}
		
		//	하나라도 있는 경우에만 트랜잭
						this.gtrace("sArguments-->"+sArguments, gtrcPos);
		if(sArguments !="")
		{
			sArguments = "sqlId=" + nexacro.wrapQuote(sArguments);										
			
			//	this.transaction(sSvcID, sURL, sInDatasets, sOutDatasets, sArguments, "gfn_callbackFunction");
		}else{
			//	트랜잭션을 하던 안하던 실행되는 함수
			this.gfn_onloadSequence();
		}
	}
}

/*++
@desc	Callback Function
*/
this.gfn_callbackFunction = function(strSvcID, nErrorCode, strErrorMsg)
{
							var gtrcPos = "Util_adh.xjs.gfn_callbackFunction"
	// 에러 체크 영역
	if (nErrorCode < 0) 
	{
		//	alert(this.gfn_removeJavaErrMsg(strErrorMsg));
		alert(strErrorMsg);

		switch (strSvcID) 
		{
			case "getAllInitData":		// 기본 데이터 가져오기인 경우는 바로 닫음.
				
				//	this.close();
			default:
				return;
		}
	}
	trace("strSvcID----->"+strSvcID);
	
	switch (strSvcID) 
	{
		case "formatSearchOnload ":	trace(this.tFormatInDs.saveXML());
		break;
	}
	return;
	switch (strSvcID) 
	{
		case "formatSearchOnload":
				
			if(this.tFormatInDs.rowcount > 0)
			{
				var oGrdPrsnDs = this.gfn_getApplication().gds_gridPersonal;
				for(var i = 0 ; i < this.tFormatInDs.rowcount ; i++)
				{
					var iAddRp = oGrdPrsnDs.addRow();
					oGrdPrsnDs.setColumn(iAddRp, "sFormatId", this.tFormatInDs.getColumn(i, "GRIDID"));
					oGrdPrsnDs.setColumn(iAddRp, "sFormat"	, this.tFormatInDs.getColumn(i, "JSONDATA"));
					oGrdPrsnDs.setColumn(iAddRp, "sFormatId", this.tFormatInDs.getColumn(i, "GRIDID"));
				}
			}
			
		case "getAllInitData":		// 기본 데이터 가져오기 - 콤보Ds세팅
			/*
			 * 공통코드 
			 * AppVariables Datasets gds_commCode에서 구분값에 맞는 코드값 가져오기
			 *
			 * 규칙
			 * Dataset ID는 마지막 4자리를 공통코드 구분자로 지정 ds_deptC001
			 * 
			 * 컴포넌트id 또는 데이터셋id를 지정
			 *  
			 * 여러개 지정시 구분자 스페이스
			 * ":"구분자 이용하여 0이면 "전체", 1이면 "선택하세요" 표현
			 * "전체" 선택시 코드값은 "ALL", "선택하세요" 선택시 코드값은 "" 으로 지정

				compId : 컴포넌트 or Dataset 아이디
				type   : 0(전체), 1(선택하세요)
				this.gfn_getCommCode(compId:type compId2:type2);
				
				ex) this.gfn_getCommCode("cbo_pos rdo_gender:0 Div00.form.cbo_dept:1 ds_hobbyE001");
			 */

																	this.gtrace("this.COMBO_SET_STR--->"+this.COMBO_SET_STR, gtrcPos);
																	//	trace("gds_User.saveXML()--->"+nexacro.getApplication().gds_User.saveXML());
																	//	nexacro.getApplication().gds_User.setColumn(0, "VENDOR_CD", "XXXXX");
																	//	nexacro.getApplication().gds_User.setColumn(0, "USER_ID", "XXXXX");
			var gdsLan 		= this.gfn_getApplication().gds_Lang;
			var gdsLanguage = this.gfn_getApplication().gds_Language;
				//		trace("gdsLanguage.rowcount---->"+gdsLanguage.rowcount);
			for(var i=0 ; i < gdsLan.rowcount ; i++){

				var sDEFAULT = this.gfn_nvl(gdsLan.getColumn(i, "DEFAULT_LANG"),"");
				var sLANG_KO = this.gfn_nvl(gdsLan.getColumn(i, "LANG_KO"),"");
				var sLANG_VI = this.gfn_nvl(gdsLan.getColumn(i, "LANG_VI"),"");
				var sLANG_ID = this.gfn_nvl(gdsLan.getColumn(i, "LANG_ID"),"");
				var sKeyLan  = this.gfn_getApplication().gds_Language_in.getColumn(0, "p_country_cd");
				var sSetLang = "";
					sSetLang = eval("sLANG_"+sKeyLan);
					sSetLang = (sSetLang==""?sLANG_KO:sSetLang);

				var nRp = gdsLanguage.addRow();
					gdsLanguage.setColumn(nRp, "DEFAULT_LANG", sDEFAULT);
					gdsLanguage.setColumn(nRp, "LANGUAGE", sSetLang);

			}

			//	trace(this.tFormatInDs.saveXML());
// 			if(this.tFormatInDs.rowcount > 0)
// 			{
// 				var oGrdPrsnDs = this.gfn_getApplication().gds_gridPersonal;
// 				for(var i = 0 ; i < this.tFormatInDs.rowcount ; i++)
// 				{
// 					var iAddRp = oGrdPrsnDs.addRow();
// 					oGrdPrsnDs.setColumn(iAddRp, "sFormatId", this.tFormatInDs.getColumn(i, "GRIDID"));
// 					oGrdPrsnDs.setColumn(iAddRp, "sFormat"	, this.tFormatInDs.getColumn(i, "JSONDATA"));
// 					oGrdPrsnDs.setColumn(iAddRp, "sFormatId", this.tFormatInDs.getColumn(i, "GRIDID"));
// 				}
// 			}
			
			//	트랜잭션을 하던 안하던 실행되는 함수
			this.gfn_onloadSequence();
			
			//{0}의 입력값의 길이는 {1} 이하이어야 합니다.
			//	테스트용 : this.gfn_alert("지시 조회", ["사원번호", "5자리"], "A");		
			
			//	
		break;

		default:
			break;	

	}
}

this.gfn_onloadSequence = function(){

	//	타 함수의 집합으로만 구성. 순서에 집중하기 위함
	
	// 공통화	--> 폼 콤포넌트 전체 돌기 실행 ( 포함 : 다국어 + ... )
	this.gfn_formOnLoad(this);
}

this.gfn_commButtonAlignByVisible = function(oDivParnt, arrBtns, arrBtnPos)
{	//	Visible 여부와 부모Div의 좌우정렬에 따라 버튼의 위치를 자동배치

						var gtrcPos = "Util_adh.xjs.gfn_commButtonAlignByVisible";
	var alignPos;
	{
						this.gtrace("oDivParnt.left--->"+oDivParnt.left, gtrcPos);
						this.gtrace("oDivParnt.right--->"+oDivParnt.right, gtrcPos);
		if(this.gfn_isNull(oDivParnt.left))
				alignPos = "RGHT";
		else 	alignPos = "LEFT"
						this.gtrace("alignPos--->"+alignPos, gtrcPos);
	}

	//	var arrBtnPos 		= [0, 76, 152, 228];
	
	switch(alignPos) {
	case "LEFT":
			var iVisIdx = 0;
			for(var i = 0 ; i < arrBtns.length ; i++)
			{
						this.gtrace("arrBtns[i].visible--->"+arrBtns[i].visible, gtrcPos);
				if(arrBtns[i].visible==true)
				{
						this.gtrace("arrBtnPos[iVisIdx]--->"+arrBtnPos[iVisIdx], gtrcPos);

					arrBtns[i].set_left(arrBtnPos[iVisIdx]);
					iVisIdx++;
				}
			}
		break;
		
	case "RGHT":
			var iVisIdx = arrBtns.length - 1;	this.gtrace("iVisIdx--->"+iVisIdx, gtrcPos);
			for(var k = arrBtns.length - 1 ; k >= 0 ; k--)
			{
						this.gtrace("arrBtns[k].visible--->"+arrBtns[k].visible, gtrcPos);
				if(arrBtns[k].visible==true)
				{
					arrBtns[k].set_left(arrBtnPos[iVisIdx]);
					iVisIdx--;
				}
			}
		break;
		
	default:
		break;
	}
}

/**********************************************************************************
 * Function Name: gfn_setUser
 * Description  : 데이터셋의 SaveUser에 사용자를 등록
 * Arguments    : 
 * Return       : 
 **********************************************************************************/
this.gfn_setUser = function(oDs, sCol) 
{
									var gtrcPos = "Util_adh.xjs.gfn_setUser";
	oDs.enableevent = false;
	var sUserId = this.gfn_getApplication().gds_User.getColumn(0, "USER_ID");
										this.gtrace("sUserId--->"+sUserId, gtrcPos);
	if(this.gfn_isNull(sCol)) sCol = "SaveUser";
	
	// 변경
	for( var i=0; i < oDs.rowcount; i++){
		if(this.gfn_ExistColumnId(oDs, sCol))
		{
			//	this.gtrace("this.gfn_ExistColumnId(oDs, sCol)--->"+this.gfn_ExistColumnId(oDs, sCol), gtrcPos);
			oDs.setColumn(i, sCol, sUserId);
		}
	}
	
	oDs.enableevent = true;

	return oDs;
}


/**********************************************************************************
 * Function Name: gfn_ExistColumnId
 * Description  : 해당 dataset에서 컬럼명이 존재 하는지 검사
 * Arguments    : objDs  - 검사할 dataset
				  sColId - 검사할 컬럼명
 * Return       : boolean
 **********************************************************************************/
this.gfn_ExistColumnId = function(objDs, sColId){
	var nColCnt = objDs.colcount;

	for(var i=0; i < nColCnt; i++){
		if (sColId == objDs.getColID(i)) return true;
	}
	return false;
}


/**********************************************************************************
 * Function Name: gfn_getParentForm
 * Description  : - Frame 바로 전 단계의 폼을 가져온다.
 * Arguments    : 
				  
 * Return       : 	//	this.sParentFormGetTxt
					//	this.oFrmParnt
					//	this.oDivParnt
					//	this.oTargetGrid
					//	this.oTargetDs
					//	this.sInitCompVisEna
 **********************************************************************************/
this.gfn_getParentForm = function()	{
													var gtrcPos = "Util_adh.xjs.gfn_getParentForm";
	
	var sEvFrm = "this.parent.form";
		
	while(!(eval(sEvFrm) instanceof nexacro.Frame)){
		sEvFrm += ".parent";
	}
	
	// 한단계 전으로
	sEvFrm = sEvFrm.replace("this.parent.form.parent","this.parent.form");
															this.gtrace("sEvFrm ---->"+sEvFrm,gtrcPos);
	var oDivParnt 		= this.parent.form.parent;			this.gtrace("oDivParnt ---->"+oDivParnt.name,gtrcPos);
	var strTargetGrid 	= oDivParnt.targetGrid;				this.gtrace("strTargetGrid ---->"+strTargetGrid,gtrcPos);
	var InitCompVisEna 	= oDivParnt.InitCompVisEna;			this.gtrace("InitCompVisEna ---->"+InitCompVisEna,gtrcPos);
			
//	var oResult = Array();
// 		oResult.sParentFormGetTxt 	= sEvFrm;
// 		oResult.oParentDiv 			= oDivParnt;

	var sGridFullName;
	var oTargetGrid; 
	var oTargetDs;	

	// 그리드와 데이터셋
	if(!this.gfn_isNull(oDivParnt.targetGrid))
	{
		sGridFullName 	= 	sEvFrm+"."+oDivParnt.targetGrid;
		oTargetGrid 	= 	eval(sGridFullName);			this.gtrace("oTargetGrid--->"+oTargetGrid.name, gtrcPos);
		oTargetDs		=	oTargetGrid.getBindDataset();	this.gtrace("oTargetDs--->"+oTargetDs.name, gtrcPos);
		
// 		oResult.oTargetGrid = oTargetGrid;
// 		oResult.oTargetDs = oTargetDs;
	}

	if(!this.gfn_isNull(sEvFrm					)) 		{this.sParentFormGetTxt 	= sEvFrm;	this.oFrmParnt = eval(sEvFrm);}
	if(!this.gfn_isNull(oDivParnt 				)) 		this.oDivParnt 			= oDivParnt;				this.gtrace("this.oDivParnt--->"+this.oDivParnt.name, gtrcPos);
	if(!this.gfn_isNull(oTargetGrid				)) 		this.oTargetGrid		= oTargetGrid;
	if(!this.gfn_isNull(oTargetDs				)) 		this.oTargetDs			= oTargetDs;
	
	// 콤보넌트 Visible / Enable
	if(!this.gfn_isNull(oDivParnt.InitCompVisEna))
	{
		this.sInitCompVisEna	= oDivParnt.InitCompVisEna;
		this.fn_setButtonVisEna();
	}

	// ReturnParam ( 확인 / 취소 에서 사용 )
	if(!this.gfn_isNull(oDivParnt.returnparms))
	{
		this.returnparms	= oDivParnt.returnparms;
	}
	
//	return oResult;
}

