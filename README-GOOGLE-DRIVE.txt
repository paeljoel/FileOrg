FILE ORG ONLINE  -  static site on Render, files and records in Google Drive
============================================================================

What you get
  * A link like https://file-org.onrender.com that works 24/7, even when the office PC is off.
  * Everyone signs in with their Google account.
  * Every report is a normal file in one Google Drive folder:  File Org / SITE / Type / Year / Month
  * The file list, chat, activity and settings are kept in  File Org / _FileOrg / "File Org Database"
    (a Google Sheet). Do not edit or delete the _FileOrg folder.
  * Cost: free (Render static site + your Google Drive's 15 GB).

Not in this version (office PC version only)
  * Ollama AI reading. The built-in naming rules still read Date of Service, Branch, Subject and Location.
  * LibreOffice previews. Instead, Word/Excel previews are made by Google Docs (very close to Word).

----------------------------------------------------------------------------
STEP 1  Google Cloud: create the sign-in "Client ID"   (about 10 minutes, free)
----------------------------------------------------------------------------
 1. Open https://console.cloud.google.com  and sign in with the admin Google account
    (the one whose Drive will hold File Org).
 2. Top bar > project picker > NEW PROJECT > name: File Org > Create. Select it.
 3. Menu > APIs & Services > Library. Search and ENABLE:
       - Google Drive API
       - Google Sheets API
 4. Menu > Google Auth Platform (or "OAuth consent screen") > Get started:
       App name: File Org      User support email: your email
       Audience: External      Contact email: your email      > Create
 5. Google Auth Platform > Data access > Add or remove scopes. Tick:
       .../auth/drive          (See, edit, create and delete all of your Google Drive files)
       .../auth/spreadsheets   (See, edit, create and delete your spreadsheets)
    > Update > Save.
 6. Google Auth Platform > Audience > PUBLISH APP (In production).
    (Testing mode also works, but then every coworker must be added as a test user
     and has to sign in again every 7 days.)
 7. Google Auth Platform > Clients > + CREATE CLIENT
       Application type: Web application      Name: File Org website
       Authorized JavaScript origins:  https://YOUR-SITE.onrender.com
       (add it after Step 2 if you do not know the address yet)   > Create
 8. Copy the Client ID (ends in .apps.googleusercontent.com).
    Open config.js in this folder and paste it between the quotes of clientId.
    The Client ID is not a password; it is safe on a public website.

----------------------------------------------------------------------------
STEP 2  Render: publish the site   (about 5 minutes, free)
----------------------------------------------------------------------------
 1. GitHub > New repository > name: file-org > Create.
    "uploading an existing file" > drag ALL files and the icons folder from this folder > Commit.
 2. https://dashboard.render.com > New > Static Site > pick the file-org repository.
       Build command:      (leave empty)
       Publish directory:  .
    > Create Static Site.  Render shows the address, e.g. https://file-org.onrender.com
 3. Back in Google Cloud > Clients > File Org website > add that address under
    Authorized JavaScript origins > Save. (Changes can take 5 minutes.)

----------------------------------------------------------------------------
STEP 3  First sign-in and sharing
----------------------------------------------------------------------------
 1. Open the Render address. Continue with Google (admin account).
    Google may say "Google hasn't verified this app": click Advanced > Go to File Org.
    Tick BOTH boxes (Drive and Sheets) > Continue.
 2. Click "Create File Org folder". A File Org folder appears in your Google Drive.
 3. In Google Drive: right-click File Org > Share > add each coworker's Google email as Editor.
 4. Coworkers open the same link and sign in with that email. On iPhone: Safari > Share >
    Add to Home Screen, so it opens like an app.

Good to know
  * Files dropped straight into the File Org folder in Google Drive (or with Google Drive
    for desktop) are picked up automatically within about 10 minutes.
  * Version history uses Google Drive's own file versions.
  * Deleted files go to File Org/_Trash first; deleting from Trash removes them.
  * Sign-in lasts about an hour; after that File Org asks you to tap Continue once.
  * Up to 100 coworkers can use an unverified Google app. That is plenty for an office.
