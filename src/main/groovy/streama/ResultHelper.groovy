package streama

import org.apache.commons.logging.LogFactory

class ResultHelper {

  public static Map generateErrorResult(statusCode, field = '', data, Boolean isVerbose = false){
    if(isVerbose)
      LogFactory.getLog(this).info("${statusCode}: ${data}")

    return [
        statusCode: statusCode,
        field: field,
        data: data,
        error: true
    ]
  }

  public static  Map generateOkResult(statusCode, data){
    return [
        statusCode: statusCode,
        data: data
    ]
  }
}
