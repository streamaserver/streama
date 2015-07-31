
<%@ page import="streama.Settings" contentType="text/html"%>

<html>
<head>
  <meta name="viewport" content="width=device-width" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Really Simple HTML Email Template</title>
  <style>
  /* -------------------------------------
      GLOBAL
  ------------------------------------- */
  * {
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
    font-size: 100%;
    line-height: 1.6;
  }

  img {
    max-width: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: none;
    width: 100%!important;
    height: 100%;
  }


  /* -------------------------------------
      ELEMENTS
  ------------------------------------- */
  a {
    color: #348eda;
  }

  .btn-primary {
    text-decoration: none;
    color: #FFF;
    background-color: #348eda;
    border: solid #348eda;
    border-width: 10px 20px;
    line-height: 2;
    font-weight: bold;
    margin-right: 10px;
    text-align: center;
    cursor: pointer;
    display: inline-block;
    border-radius: 25px;
  }

  .btn-secondary {
    text-decoration: none;
    color: #FFF;
    background-color: #aaa;
    border: solid #aaa;
    border-width: 10px 20px;
    line-height: 2;
    font-weight: bold;
    margin-right: 10px;
    text-align: center;
    cursor: pointer;
    display: inline-block;
    border-radius: 25px;
  }

  .last {
    margin-bottom: 0;
  }

  .first {
    margin-top: 0;
  }

  .padding {
    padding: 10px 0;
  }


  /* -------------------------------------
      BODY
  ------------------------------------- */
  table.body-wrap {
    width: 100%;
    padding: 20px;
  }

  table.body-wrap .container {
    border: 1px solid #f0f0f0;
  }


  /* -------------------------------------
      FOOTER
  ------------------------------------- */
  table.footer-wrap {
    width: 100%;
    clear: both!important;
  }

  .footer-wrap .container p {
    font-size: 12px;
    color: #666;

  }

  table.footer-wrap a {
    color: #999;
  }


  /* -------------------------------------
      TYPOGRAPHY
  ------------------------------------- */
  h1, h2, h3 {
    font-family: "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    color: #000;
    margin: 40px 0 10px;
    line-height: 1.2;
    font-weight: 200;
  }

  h1 {
    font-size: 36px;
  }
  h2 {
    font-size: 28px;
  }
  h3 {
    font-size: 22px;
  }

  p, ul, ol {
    margin-bottom: 10px;
    font-weight: normal;
    font-size: 14px;
  }

  ul li, ol li {
    margin-left: 5px;
    list-style-position: inside;
  }

  /* ---------------------------------------------------
      RESPONSIVENESS
      Nuke it from orbit. It's the only way to be sure.
  ------------------------------------------------------ */

  /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
  .container {
    display: block!important;
    max-width: 600px!important;
    margin: 0 auto!important; /* makes it centered */
    clear: both!important;
  }

  /* Set the padding on the td rather than the div for Outlook compatibility */
  .body-wrap .container {
    padding: 20px;
  }

  /* This should also be a block element, so that it will fill 100% of the .container */
  .content {
    max-width: 600px;
    margin: 0 auto;
    display: block;
  }

  /* Let's make sure tables in the content area are 100% wide */
  .content table {
    width: 100%;
  }

  </style>
</head>

<body bgcolor="#f6f6f6">



<!-- body -->
<table class="body-wrap">

  <tr>
    <td></td>
    <td class="container" bgcolor="#FFFFFF">
      <!-- content -->
      <div class="content">

        <table>
          <tr>
            <td>
              <h1>Welcome to Streama!</h1>
              <p>You have been exclusively invited to Streama! Just set your password and enjoy :) </p>
              <table>
                <tr>
                  <td class="padding">
                    <p>
                      <a href="${streama.Settings.findBySettingsKey('Base URL')?.value}/invite?uuid=${user?.uuid}" class="btn-primary">Set Password & Enjoy</a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>
      </div>
      <!-- /content -->

    </td>
    <td></td>
  </tr>
</table>
<!-- /body -->


</body>
</html>
