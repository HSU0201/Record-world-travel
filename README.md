## 專案名稱

旅行記錄應用程式

## 描述

這個專案是一個用於記錄旅行中所造訪城市與國家的網頁應用程式。我透過參與網路課程和自我學習來完善這個專案，專注於提升 React 開發技能。

## 學習

- **Context 與 Hooks**: 使用 React 的 Context API 與 hooks 來管理狀態和提供資料給整個應用程式。
- **不依賴 Next.js 的 React 開發**: 在不依賴 Next.js 框架的情況下開發專案，展現獨立創建 React 應用程式的能力。
- **響應式設計**: 實現響應式設計原則，確保應用程式能夠在不同螢幕大小和設備上適應良好。
- **使用 date-fns 進行本地化**: 使用 date-fns 將日期本地化為中文，為說中文的使用者提供更友好的使用體驗。
- **整合 react-leaflet**: 整合 react-leaflet 將互動地圖插入應用程式中，允許對地圖界面進行自定義和微調。
- **使用 Vite**: 學習如何使用 Vite 建置應用程式。
- **初次體驗netlify**:了解netlify的使用，但目前遇到了小問題。

## 依賴套件

- "date-fns": "^3.0.2-rc.1"
- "json-server": "^1.0.0-beta.0"
- "leaflet": "^1.9.4"
- "react": "^18.2.0"
- "react-datepicker": "^6.9.0"
- "react-dom": "^18.2.0"
- "react-leaflet": "^4.2.1"
- "react-router-dom": "^6.23.1"

## 如何下載並使用 `Record-world-travel`

若要下載並使用 `Record-world-travel`，請按照以下步驟進行：

1. **複製專案連結**

   打開你的瀏覽器，前往存放 `Record-world-travel` 的雲端儲存位置，並複製專案的連結（URL）。

2. **使用 Git 下載專案**

   打開命令列應用程式（例如 Terminal、Command Prompt、或 PowerShell），使用以下命令下載專案，並將 `<project-url>` 替換為你複製的專案連結：

   ```sh
   git clone <project-url>
   ```

3. **安裝相依套件**

在命令列中導航到下載的 vite-project 目錄，然後執行以下命令安裝專案所需的相依套件：

```sh
npm install
```

4. **執行開發伺服器**

使用以下命令啟動開發伺服器：

```sh
npm run dev
# 與
npm run server
```

這將啟動 Vite 開發伺服器，你可以在瀏覽器中查看和測試你的應用程式。
