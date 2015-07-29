@if "%DEBUG%" == "" @echo off
@rem ##########################################################################
@rem                                                                         ##
@rem  Grails JVM Bootstrap for Windows                                       ##
@rem                                                                         ##
@rem ##########################################################################

@rem Set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" setlocal

set CLASS=org.grails.wrapper.GrailsWrapper

if exist "%USERPROFILE%/.groovy/preinit.bat" call "%USERPROFILE%/.groovy/preinit.bat"

@rem Determine the command interpreter to execute the "CD" later
set COMMAND_COM="cmd.exe"
if exist "%SystemRoot%\system32\cmd.exe" set COMMAND_COM="%SystemRoot%\system32\cmd.exe"
if exist "%SystemRoot%\command.com" set COMMAND_COM="%SystemRoot%\command.com"

@rem Use explicit find.exe to prevent cygwin and others find.exe from being used
set FIND_EXE="find.exe"
if exist "%SystemRoot%\system32\find.exe" set FIND_EXE="%SystemRoot%\system32\find.exe"
if exist "%SystemRoot%\command\find.exe" set FIND_EXE="%SystemRoot%\command\find.exe"

:check_JAVA_HOME
@rem Make sure we have a valid JAVA_HOME
if not "%JAVA_HOME%" == "" goto have_JAVA_HOME

echo.
echo ERROR: Environment variable JAVA_HOME has not been set.
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.
echo.
goto end

:have_JAVA_HOME
@rem Remove trailing slash from JAVA_HOME if found
if "%JAVA_HOME:~-1%"=="\" SET JAVA_HOME=%JAVA_HOME:~0,-1%

@rem Validate JAVA_HOME
%COMMAND_COM% /C DIR "%JAVA_HOME%" 2>&1 | %FIND_EXE% /I /C "%JAVA_HOME%" >nul
if not errorlevel 1 goto check_GRAILS_HOME

echo.
echo ERROR: JAVA_HOME is set to an invalid directory: %JAVA_HOME%
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.
echo.
goto end

:check_GRAILS_HOME
@rem Define GRAILS_HOME if not set
if "%GRAILS_HOME%" == "" set GRAILS_HOME=%DIRNAME%..

@rem Remove trailing slash from GRAILS_HOME if found
if "%GRAILS_HOME:~-1%"=="\" SET GRAILS_HOME=%GRAILS_HOME:~0,-1%

:init

for %%x in ("%USERPROFILE%") do set SHORTHOME=%%~fsx
if "x%GRAILS_AGENT_CACHE_DIR%" == "x" set GRAILS_AGENT_CACHE_DIR=%SHORTHOME%/.grails/2.4.4/
set SPRINGLOADED_PARAMS="profile=grails;cacheDir=%GRAILS_AGENT_CACHE_DIR%"
if not exist "%GRAILS_AGENT_CACHE_DIR%" mkdir "%GRAILS_AGENT_CACHE_DIR%"

if "%GRAILS_NO_PERMGEN%" == "" (
	type "%JAVA_HOME%\include\classfile_constants.h" 2>nul | findstr /R /C:"#define JVM_CLASSFILE_MAJOR_VERSION 5[23]" >nul
	if not errorlevel 1 set GRAILS_NO_PERMGEN=1
)

set AGENT_STRING=-javaagent:wrapper/springloaded-1.2.1.RELEASE.jar -Xverify:none -Dspringloaded.synchronize=true -Djdk.reflect.allowGetCallerClass=true -Dspringloaded=\"%SPRINGLOADED_PARAMS%\"
set DISABLE_RELOADING=
if "%GRAILS_OPTS%" == "" (
	set GRAILS_OPTS=-server -Xmx768M -Xms64M -Dfile.encoding=UTF-8
	if not "%GRAILS_NO_PERMGEN%" == "1" (
		set GRAILS_OPTS=-server -Xmx768M -Xms64M -XX:PermSize=32m -XX:MaxPermSize=256m -Dfile.encoding=UTF-8
	)
)

@rem Get command-line arguments, handling Windows variants
if "%@eval[2+2]" == "4" goto 4NT_args

@rem Slurp the command line arguments.
set CMD_LINE_ARGS=
set CP=
set INTERACTIVE=true

:win9xME_args_slurp
if "x%~1" == "x" goto execute
set CURR_ARG=%~1
if "%CURR_ARG:~0,2%" == "-D" (
	set CMD_LINE_ARGS=%CMD_LINE_ARGS% %~1=%~2
	shift
	shift
	goto win9xME_args_slurp
)
if "x%~1" == "x-cp" (
	set CP=%~2
	shift
	shift
	goto win9xME_args_slurp
)
if "x%~1" == "x-debug" (
	set JAVA_OPTS=%JAVA_OPTS% -Xdebug -Xnoagent -Dgrails.full.stacktrace=true -Djava.compiler=NONE -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=5005
	shift
	goto win9xME_args_slurp
)
if "x%~1" == "x-classpath" (
	set CP=%~2
	shift
	shift
	goto win9xME_args_slurp
)
if "x%~1" == "x-reloading" (
	set AGENT=%AGENT_STRING%
	shift
	goto win9xME_args_slurp
)
if "x%~1" == "xrun-app" (
	set AGENT=%AGENT_STRING%
	set INTERACTIVE=
	set CMD_LINE_ARGS=%CMD_LINE_ARGS% %1
	shift
	goto win9xME_args_slurp
)
if "x%~1" == "x-noreloading" (
	set DISABLE_RELOADING=true
	shift
	goto win9xME_args_slurp
)
set INTERACTIVE=
set CMD_LINE_ARGS=%CMD_LINE_ARGS% %1
shift
goto win9xME_args_slurp

:4NT_args
@rem Get arguments from the 4NT Shell from JP Software
set CMD_LINE_ARGS=%$

:execute
@rem Setup the command line
set STARTER_CLASSPATH=wrapper/grails-wrapper-runtime-2.4.4.jar;wrapper;.

if exist "%USERPROFILE%/.groovy/init.bat" call "%USERPROFILE%/.groovy/init.bat"

@rem Setting a classpath using the -cp or -classpath option means not to use
@rem the global classpath. Groovy behaves then the same as the java interpreter

if "x" == "x%CLASSPATH%" goto after_classpath
set CP=%CP%;%CLASSPATH%
:after_classpath

if "x%DISABLE_RELOADING%" == "xtrue" (
	set AGENT=
) else (
	if "x%INTERACTIVE%" == "xtrue" (
		set AGENT=%AGENT_STRING%
	)
)

set STARTER_MAIN_CLASS=org.grails.wrapper.GrailsWrapper
set STARTER_CONF=%GRAILS_HOME%\conf\groovy-starter.conf

set JAVA_EXE=%JAVA_HOME%\bin\java.exe
set TOOLS_JAR=%JAVA_HOME%\lib\tools.jar

set JAVA_OPTS=%GRAILS_OPTS% %JAVA_OPTS% %AGENT%

set JAVA_OPTS=%JAVA_OPTS% -Dprogram.name="%PROGNAME%"
set JAVA_OPTS=%JAVA_OPTS% -Dgrails.home="%GRAILS_HOME%"
set JAVA_OPTS=%JAVA_OPTS% -Dgrails.version=2.4.4
set JAVA_OPTS=%JAVA_OPTS% -Dbase.dir=.
set JAVA_OPTS=%JAVA_OPTS% -Dtools.jar="%TOOLS_JAR%"
set JAVA_OPTS=%JAVA_OPTS% -Dgroovy.starter.conf="%STARTER_CONF%"

if exist "%USERPROFILE%/.groovy/postinit.bat" call "%USERPROFILE%/.groovy/postinit.bat"

@rem Execute Grails
CALL "%JAVA_EXE%" %JAVA_OPTS% -classpath "%STARTER_CLASSPATH%" %STARTER_MAIN_CLASS% --main %CLASS% --conf "%STARTER_CONF%" --classpath "%CP%" "%CMD_LINE_ARGS%"
:end
@rem End local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" endlocal

@rem Optional pause the batch file
if "%GROOVY_BATCH_PAUSE%" == "on" pause
