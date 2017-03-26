package streama

import org.apache.commons.logging.LogFactory
import static javax.servlet.http.HttpServletResponse.SC_OK

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

  public static  Map generateOkResult(statusCode = SC_OK, data = [:]){
    return [
        statusCode: statusCode,
        data: data
    ]
  }
}
