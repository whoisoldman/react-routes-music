export default function RootLayout() {
  return (
    <div style={{padding:16,fontFamily:"Inter,system-ui,Arial"}}>
      <h2>Layout OK</h2>
      <p>Навигация временно отключена.</p>
      <div id="slot" style={{border:"1px dashed #aaa", padding:12, marginTop:12}}>
        {/* сюда попадёт Outlet позже */}
      </div>
    </div>
  );
}
