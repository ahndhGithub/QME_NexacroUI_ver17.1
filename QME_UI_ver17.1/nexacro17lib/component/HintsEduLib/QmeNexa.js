﻿/**
*  @FileName 	QmeNexa.js 
*/
 
var pForm = nexacro.Form.prototype;

pForm._getUserProperty = function (obj,userPropertyName)
{
															var gtrcPos	= "Util_adh.xjs._getUserProperty";
	var sEvVal = obj+"."+userPropertyName;						this.gtrace(" - sEvVal --->"+sEvVal, gtrcPos);
	var sProp = eval(sEvVal);									this.gtrace(" - sProp --->"+sProp, gtrcPos);
 	var arrprop = sProp.split(",");

 	return arrprop;
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

// /*++
// @desc	온로드 이벤트, 필요한 모든 데이터 가져옴
// 		-	콤보 , 권한 , 유저 , ...
// */
pForm.gfn_getAllInitData = function()
{
																		var gtrcPos = "Util_adh.xjs.gfn_getAllInitData";
																		this.gtrace("● 온로드 이벤트, 필요한 모든 데이터 가져옴",gtrcPos);
	//html로부터 전달받은값, 브라우져정보
	var sQMELOGONUSERID = 	nexacro.getApplication().QmeLogonUserId;		this.gtrace(" - 유저 : sQMELOGONUSERID--->"+sQMELOGONUSERID,gtrcPos);
	var sLANGUAGEKEY	=	nexacro.getApplication().LanguageKey;       	this.gtrace(" - 언어 : sLANGUAGEKEY--->"+sLANGUAGEKEY,gtrcPos);
	var sNAVIGATOR		=	this.gfn_getNavigator();						this.gtrace(" - 브라우져 : this.gfn_getNavigator()--->"+this.gfn_getNavigator(),gtrcPos);		//NEXACRO / IE / CHROME

	{	//	gds_QmeLogonInfo 데이터셋 세팅
		if(this.gfn_getNavigator()=="NEXACRO"){	//	넥사크로 전용브라우져 실행시 - 테스트용 데이터
																			this.gtrace(" - 로그온유저Ds : (gds_QmeLogonInfo.rowcount) --->"+nexacro.getApplication().gds_QmeLogonInfo.rowcount,gtrcPos);
// 			if(nexacro.getApplication().gds_QmeLogonInfo.rowcount==0)
// 			{
				//무조건 트랜잭션
																			this.gtrace(" -  넥사크로전용브라우져--TRANSYES", gtrcPos);
				nexacro.getApplication().gds_QmeLogonInfo_in.clearData();
				nexacro.getApplication().gds_QmeLogonInfo_in.addRow();
				nexacro.getApplication().gds_QmeLogonInfo_in.setColumn(0, "p_user_id", "160307");	//	160307 : 나유철
				nexacro.getApplication().gds_Language_in.clearData();
				nexacro.getApplication().gds_Language_in.addRow();
				nexacro.getApplication().gds_Language_in.setColumn(0, "p_country_cd", "KO");		//	한국 : KO / 베트남 : VI / 인도네시아 : ID

// 			}else{
// 				this.gtrace(" - nexacro전용브라우져--NOTRANS", gtrcPos);
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
		
					this.gtrace(" ---- 유저DS(gds_User) : gds_User.rowcount--->"+this.gfn_getApplication().gds_User.rowcount, gtrcPos);
		if(this.gfn_getApplication().gds_User.rowcount == 0 )
		{	// 사용자로그인정보 가져오기 : 있다면 스킵 ( ex. 팝업 )
			sArguments+="UserMapper.getLoginInfo ";
			sInDatasets+="ds_in"+iSeq+"=gds_QmeLogonInfo_in"+" ";
			sOutDatasets+="gds_User=ds_out"+iSeq+" ";
			iSeq++;	//	this.gtrace(" - iSeq-->"+iSeq, gtrcPos);		
		}
		
																		this.gtrace(" ---- 언어DS(gds_Language) : gds_Language.rowcount--->"+this.gfn_getApplication().gds_Language.rowcount, gtrcPos);
		if(this.gfn_getApplication().gds_Language.rowcount == 0 )
		{	// 언어 가져오기
			sArguments+="CommonMapper.getMultiLang ";
			sInDatasets+="ds_in"+iSeq+"=gds_Language_in"+" ";
			sOutDatasets+="gds_Language=ds_out"+iSeq+" ";
			iSeq++;	
			this.gtrace(" - sArguments-->"+sArguments, gtrcPos);
		}
		
		{	//	그리드포맺 가져오기
			var tFormatInDs = new Dataset;
				var tFormatInDsName = "tFormatInDs";
				this.addChild(tFormatInDsName, tFormatInDs);
				tFormatInDs.copyData(this.gfn_getApplication().gds_FormatInOutDs);
				tFormatInDs.addRow();
				//	this.gfn_setUser(tFormatInDs, "USERID");
				//	tFormatInDs.setColumn(0, "PROGRAMID", this.name);
				this.gfn_setUser(tFormatInDs, "p_user_id");
				this.tFormatInDs.setColumn(0, "p_program_id", this.name);
				this.tFormatInDs.setColumn(0, "p_default_yn", "Y");
				
				this.gtrace(this.tFormatInDs.saveXML(),gtrcPos);
				
			sArguments+="getUserGridData ";
			sInDatasets+="ds_in"+iSeq+"=tFormatInDs"+" ";
			sOutDatasets+="tFormatInDs=ds_out"+iSeq+" ";
			iSeq++;		this.gtrace("그리드포맺 가져오기 : - sArguments-->"+sArguments, gtrcPos);
		}
		
		
		var arrCmmCode = this.gfn_getArrComboSetStr();		this.gtrace(" ---- 공통코드", gtrcPos);
															this.gtrace(" ---- 널체크 : arrCmmCode-->"+arrCmmCode, gtrcPos);
		if(!this.gfn_isNull(arrCmmCode))
		{	//공통코드정보 가져오기 인풋 추가


			for(var k = 0 ; k < arrCmmCode.length ; k++)
			{
				var sTmpDsName = arrCmmCode[k].dsName;
				var sTmpCmType = arrCmmCode[k].cmType;
				
				switch(sTmpCmType)		//	dsName, cmType
				{
					//사용자Center
					case "UserMapper.getUserCenter" 	: 
						var tCommInDs = new Dataset;
						var tCommInDsName = "tCommInDs"+k;
						this.addChild(tCommInDsName, tCommInDs); 
							tCommInDs.addColumn( "p_user_id", "string" );
							tCommInDs.addColumn( "p_country_cd", "string" );
							tCommInDs.addRow();
							tCommInDs.setColumn(0, "p_user_id", nexacro.getApplication().gds_QmeLogonInfo_in.getColumn(0, "p_user_id"));
							//tCommInDs.setColumn(0, "p_country_cd", nexacro.getApplication().gds_Language_in.getColumn(0, "p_country_cd"));									
							tCommInDs.setColumn(0, "p_country_cd", "%");	//%로 넘겨야한다.
							
							sArguments	+=	sTmpCmType							+" ";
							sInDatasets	+=	"ds_in"+iSeq+"="+tCommInDsName	+" ";
							sOutDatasets+=	sTmpDsName+"=ds_out"+iSeq			+" ";
							iSeq++;
							//	trace(tCommInDs.saveXML());
						break;
						
					//Sales Group
					case "CommonMapper.getSalesGroup" 	: 
						var tCommInDs = new Dataset;
						var tCommInDsName = "tCommInDs"+k;
						this.addChild(tCommInDsName, tCommInDs); 
							tCommInDs.addColumn( "p_bu_cd", "string" );
							tCommInDs.addRow();
							tCommInDs.setColumn(0, "p_bu_cd", "%");
							
							sArguments	+=	sTmpCmType							+" ";
							sInDatasets	+=	"ds_in"+iSeq+"="+tCommInDsName	+" ";
							sOutDatasets+=	sTmpDsName+"=ds_out"+iSeq			+" ";
							iSeq++;
						break;

					//공통코드
					default : 
						var tCommInDs = new Dataset;
						var tCommInDsName = "tCommInDs"+k;
						this.addChild(tCommInDsName, tCommInDs); 
							tCommInDs.copyData(nexacro.getApplication().gds_CommCodeIn);
							tCommInDs.setColumn(tCommInDs.addRow(), "p_code_grp", sTmpCmType);
							
							switch(sTmpCmType)
							{	// 특이로직
								case "CURRENCY" :	tCommInDs.setColumn(0, "p_sub_cd1", "T");	// 통화
											break;
								default : break;
							}

							sArguments	+=	"CommonMapper.getCodeInfo"		+" ";	//	this.gtrace(" - sArguments-->"+sArguments, gtrcPos);
							sInDatasets	+=	"ds_in"+iSeq+"="+tCommInDsName	+" ";
							sOutDatasets+=	sTmpDsName+"=ds_out"+iSeq			+" ";
							iSeq++;
						break;
				}
			}
			
			this.gtrace(" ------ 아규먼트 : sArguments--->"+sArguments, gtrcPos);
			this.gtrace(" ------ IN데이터셋 : sInDatasets--->"+sInDatasets, gtrcPos);
			this.gtrace(" ------ OUT데이터셋 : sOutDatasets--->"+sOutDatasets, gtrcPos);
		}
		
		//	하나라도 있는 경우에만 트랜잭
		if(sArguments !="")
		{
			sArguments = "sqlId=" + nexacro.wrapQuote(sArguments);										
			this.transaction(sSvcID, sURL, sInDatasets, sOutDatasets, sArguments, "gfn_callbackFunction")	//, false); // sync로 보낸다.
		}else{
			//	트랜잭션을 하던 안하던 실행되는 함수
			this.gfn_onloadSequence();
		}
	}
}

/*++
@desc	Callback Function
*/
pForm.gfn_callbackFunction = function(strSvcID, nErrorCode, strErrorMsg)
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

	switch (strSvcID) 
	{
		case "formatSearchOnload": 

			var oGrdPrsnDs = this.gfn_getApplication().gds_gridPersonal;
				trace("BEFORE---->"+this.gfn_getApplication().gds_gridPersonal.saveXML());
				oGrdPrsnDs.clearData();
				trace("AFTER---->"+this.gfn_getApplication().gds_gridPersonal.saveXML());
			if(this.tFormatInDs.rowcount > 0)
			{
				for(var i = 0 ; i < this.tFormatInDs.rowcount ; i++)
				{
					var iAddRp = oGrdPrsnDs.addRow();
					oGrdPrsnDs.setColumn(iAddRp, "sFormatId"	, this.tFormatInDs.getColumn(i, "GRIDID"));
					oGrdPrsnDs.setColumn(iAddRp, "sFormat"		, this.tFormatInDs.getColumn(i, "JSONDATA"));
					//	oGrdPrsnDs.setColumn(iAddRp, "sOrgFormat"	, this.tFormatInDs.getColumn(i, "JSONDATA"));
				}
				//	trace(oGrdPrsnDs.saveXML());
			}
			
			this.gfn_onloadSequence();	//테스트 끝나면 이걸 막자
			
			break;

		case "getAllInitData":		// 기본 데이터 가져오기 - 콤보Ds세팅
			
			{	// 포맺그리드 처리

				var oTmpFrmDs = this.tFormatInDs;

				//테스트데이터는 삭제
				var iTstRp = oTmpFrmDs.findRowExpr("GRID_ID=='MASTER' && LAYOUT_NM=='TEST_LAYOUT'");
					oTmpFrmDs.deleteRow(iTstRp);
					this.gtrace("oTmpFrmDs.saveXML---->"+oTmpFrmDs.saveXML(),gtrcPos);

					//	trace("oTmpFrmDs.getRowCount()---->"+oTmpFrmDs.getRowCount());
				//포맺데이터가 있을 경우만 실행
				if(oTmpFrmDs.getRowCount() > 0)
				{
					var oGrdPrsnDs = this.gfn_getApplication().gds_gridPersonal;
						oGrdPrsnDs.clearData();	

					for(var i = 0 ; i < oTmpFrmDs.rowcount ; i++)
					{
						var sData = "";
						for(var k = 0 ; k < 10 ; k++){
							sData += this.gfn_nvl(oTmpFrmDs.getColumn(iAddRp, "DATA_"+(k+1)), "");
						}
						
						var iAddRp = oGrdPrsnDs.addRow();
						oGrdPrsnDs.setColumn(iAddRp, "sFormatId"	, this.tFormatInDs.getColumn(i, "GRIDID"));
						oGrdPrsnDs.setColumn(iAddRp, "sFormat"		, sData);
					}

				}
			}
			
			//	trace(this.ds_outCompanyCode.saveXML());
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
			 
			 var arrCmmCode = this.gfn_getArrComboSetStr();
			 if(!this.gfn_isNull(arrCmmCode)){
				 for(var j=0 ; j < arrCmmCode.length ; j++)
				 {
					var sTdsNm = arrCmmCode[j].dsName;

					if(this.gfn_nvl(sTdsNm,"") !="")
					{
						var tDs = eval("this."+sTdsNm);
						this.gfn_SetFirstRow(tDs, "CODE_CD", "CODE_NM", "S ");
						
						//	코드+명칭으로 표시
						for(var k=0 ; k < tDs.getRowCount() ; k++)
						{
							var tCd = tDs.getColumn(k, "CODE_CD");
							var tNm = tDs.getColumn(k, "CODE_NM");
							tDs.setColumn(k , "CODE_NM", tCd==""?tNm:tCd+"-"+tNm);
						}
					}
				 }
			 }

																	//	this.gtrace(" - this.COMBO_SET_STR--->"+this.COMBO_SET_STR, gtrcPos);
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

		
			//	위와 아래는 맛보기임.
		{	// 	
// 			var tFormatInDs = new Dataset;
// 				var tFormatInDsName = "tFormatInDs";
// 				this.addChild(tFormatInDsName, tFormatInDs); 
// 				tFormatInDs.copyData(this.gfn_getApplication().gds_FormatInOutDs);
// 				tFormatInDs.addRow();
// 				this.gfn_setUser(tFormatInDs, "USERID");
// 				tFormatInDs.setColumn(0, "PROGRAMID", this.name);
// 				//	trace(tFormatInDs.saveXML());
// 					//	this.gtrace("tFormatInDs.saveXML()-->"+tFormatInDs.saveXML(), gtrcPos);
// 					// 	sArguments+="formatSearchOnload "; 
// 					// 	sInDatasets+="ds_in"+iSeq+"=tFormatInDs"+" ";
// 					// 	sOutDatasets+="tFormatInDs=ds_out"+iSeq;
// 					//	this.transaction(sSvcID, sURL, sInDatasets, sOutDatasets, sArguments, "gfn_callbackFunction");
// 			this.transaction( "formatSearchOnload"
// 								, "AppSvrLocalMsSql::CommonSaveAction_Return.do"
// 								, "ds_in0=tFormatInDs"
// 								, "tFormatInDs=ds_out0"
// 								, "sqlId=" + nexacro.wrapQuote("formatSearchOnload")
// 								, "gfn_callbackFunction");
		}


		break;

		default:
			break;	

	}
}

pForm.gfn_onloadSequence = function(){

	//	타 함수의 집합으로만 구성. 순서에 집중하기 위함
	
	// 공통화	--> 폼 콤포넌트 전체 돌기 실행 ( 포함 : 다국어 + ... )
	this.gfn_formOnLoad(this);
}

pForm.gfn_commButtonAlignByVisible = function(oDivParnt, arrBtns, arrBtnPos)
{	//	Visible 여부와 부모Div의 좌우정렬에 따라 버튼의 위치를 자동배치

						var gtrcPos = "Util_adh.xjs.gfn_commButtonAlignByVisible";
	var alignPos;
	{
						this.gtrace(" - oDivParnt.left--->"+oDivParnt.left, gtrcPos);
						this.gtrace(" - oDivParnt.right--->"+oDivParnt.right, gtrcPos);
		if(this.gfn_isNull(oDivParnt.left))
				alignPos = "RGHT";
		else 	alignPos = "LEFT"
						this.gtrace(" - alignPos--->"+alignPos, gtrcPos);
	}

	//	var arrBtnPos 		= [0, 76, 152, 228];
	
	switch(alignPos) {
	case "LEFT":
			var iVisIdx = 0;
			for(var i = 0 ; i < arrBtns.length ; i++)
			{
						this.gtrace(" - arrBtns[i].visible--->"+arrBtns[i].visible, gtrcPos);
				if(arrBtns[i].visible==true)
				{
						this.gtrace(" - arrBtnPos[iVisIdx]--->"+arrBtnPos[iVisIdx], gtrcPos);

					arrBtns[i].set_left(arrBtnPos[iVisIdx]);
					iVisIdx++;
				}
			}
		break;
		
	case "RGHT":
			var iVisIdx = arrBtns.length - 1;	this.gtrace(" - iVisIdx--->"+iVisIdx, gtrcPos);
			for(var k = arrBtns.length - 1 ; k >= 0 ; k--)
			{
						this.gtrace(" - arrBtns[k].visible--->"+arrBtns[k].visible, gtrcPos);
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
pForm.gfn_setUser = function(oDs, sCol) 
{
									var gtrcPos = "Util_adh.xjs.gfn_setUser";
	oDs.enableevent = false;
	var sUserId = this.gfn_getApplication().gds_User.getColumn(0, "USER_ID");
										this.gtrace(" - sUserId--->"+sUserId, gtrcPos);
	if(this.gfn_isNull(sCol)) sCol = "SaveUser";
	
	// 변경
	for( var i=0; i < oDs.rowcount; i++){
		if(this.gfn_ExistColumnId(oDs, sCol))
		{
			//	this.gtrace(" - this.gfn_ExistColumnId(oDs, sCol)--->"+this.gfn_ExistColumnId(oDs, sCol), gtrcPos);
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
pForm.gfn_ExistColumnId = function(objDs, sColId){
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
pForm.gfn_getParentForm = function()	{

	var gtrcPos = "Util_adh.xjs.gfn_getParentForm";	this.gtrace("●부모폼가져오기(gfn_getParentForm)", gtrcPos);
	
	var sEvFrm = "this.parent.form";
	
	var sTmpNm="";
	while(!(eval(sEvFrm) instanceof nexacro.Frame)){
		sEvFrm += ".parent";
		
		sTmpNm = eval(sEvFrm).name + "." + sTmpNm;
	}
	
	// 한단계 전으로
	sEvFrm = sEvFrm.replace("this.parent.form.parent","this.parent.form");
															this.gtrace(" - sEvFrm ---->"+sEvFrm,gtrcPos);
	var oDivParnt 		= this.parent.form.parent;			this.gtrace(" - oDivParnt ---->"+oDivParnt.name,gtrcPos);
	var strTargetGrid 	= oDivParnt.targetGrid;				this.gtrace(" - strTargetGrid ---->"+strTargetGrid,gtrcPos);
	var InitCompVisEna 	= oDivParnt.InitCompVisEna;			this.gtrace(" - InitCompVisEna ---->"+InitCompVisEna,gtrcPos);
			
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
		oTargetGrid 	= 	eval(sGridFullName);			this.gtrace(" - oTargetGrid--->"+oTargetGrid.name, gtrcPos);
		oTargetDs		=	oTargetGrid.getBindDataset();	this.gtrace(" - oTargetDs--->"+oTargetDs.name, gtrcPos);
		
// 		oResult.oTargetGrid = oTargetGrid;
// 		oResult.oTargetDs = oTargetDs;
	}

	if(!this.gfn_isNull(sEvFrm					)) 		{this.sParentFormGetTxt 	= sEvFrm;	this.oFrmParnt = eval(sEvFrm);}
	if(!this.gfn_isNull(oDivParnt 				)) 		this.oDivParnt 			= oDivParnt;				this.gtrace(" - this.oDivParnt--->"+this.oDivParnt.name, gtrcPos);
	if(!this.gfn_isNull(oTargetGrid				)) 		this.oTargetGrid		= oTargetGrid;
	if(!this.gfn_isNull(oTargetDs				)) 		this.oTargetDs			= oTargetDs;
														this.fullPath = sTmpNm;
	

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



pForm.gfn_getArrComboSetStr = function(){
	if(!this.gfn_isNull(this.COMBO_SET_STR))
	{	// COMBO_SET_STR이 없다면 스킵
			
		var arrResult = Array();
		var arrTmp = this.COMBO_SET_STR.split(" ");
		for(var i = 0 ; i < arrTmp.length ; i++)
		{
			var tStr 	= arrTmp[i];
			var tStrSpl = tStr.split("#");
			var tArr 	= { dsName: tStrSpl[0], cmType: tStrSpl[1] };
				arrResult.push(tArr);
		}
		return arrResult;
	}
}