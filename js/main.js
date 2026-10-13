(function () {
  var WA = "923225797089";

  // Prefilled WhatsApp links
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = "https://wa.me/" + a.getAttribute("href").split("/").pop().split("?")[0] + "?text=" + encodeURIComponent(a.dataset.wa);
    a.target = "_blank";
    a.rel = "noopener";
  });

  // Screenshot viewer
  var G = {
    munshi: { title: "Munshi", note: "Screenshots show a demo venue with sample data.", imgs: [
      ["munshi-dashboard", "Dashboard with revenue, upcoming events and hall occupancy"],
      ["munshi-receipt-crop", "Booking receipt with PRA invoice number and QR code", "narrow"],
      ["munshi-reservations", "Reservations list with status and balances"],
      ["munshi-calendar-crop", "Month calendar showing open, held and booked halls"]] },
    property: { title: "Property & Construction", note: "Screenshots use sample data.", imgs: [
      ["property-dashboard", "Dashboard with cash position, capital deployed and active projects"],
      ["property-list", "Properties bought and tracked with company funds"],
      ["property-construction", "Construction projects, from kickoff to completion"]] },
    pharma: { title: "PharmaFlow", note: "Screenshots show sample data.", imgs: [
      ["pharma-dashboard-crop", "Shop dashboard with sales, cash, khata and alerts"],
      ["pharma-mobile", "Owner phone app", "phone"]] },
    school: { title: "Taleem", note: "Screenshots show sample data.", imgs: [
      ["school-web", "Owner dashboard with fees, dues and attendance"],
      ["school-mobile", "Owner phone app", "phone"]] },
    stock: { title: "StockFlow", note: "Screenshots show sample data. Working name.", imgs: [
      ["stock-web", "Distribution dashboard with sales, receivables and stock alerts"]] }
  };
  var dlg = document.getElementById("viewer");
  if (dlg) document.querySelectorAll("[data-gallery]").forEach(function (b) {
    b.addEventListener("click", function () {
      var g = G[b.dataset.gallery];
      document.getElementById("viewer-title").textContent = g.title;
      document.getElementById("viewer-note").textContent = g.note;
      var body = document.getElementById("viewer-body");
      body.textContent = "";
      if (!g.imgs.length) {
        var d = document.createElement("div"); d.className = "vph"; d.textContent = "Screenshot coming soon."; body.appendChild(d);
      }
      g.imgs.forEach(function (i) {
        var im = new Image();
        im.src = "assets/img/" + i[0] + ".jpg"; im.alt = i[1] + " (sample data)";
        if (i[2] === "phone") { im.className = "phone"; body.appendChild(im); return; }
        var w = document.createElement("div"); w.className = "browser" + (i[2] ? " " + i[2] : "");
        w.appendChild(im); body.appendChild(w);
      });
      if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
    });
  });
  if (dlg) dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });

  // Contact form -> opens WhatsApp with the details filled in (no server needed)
  var f = document.getElementById("contact-form");
  if (f) f.addEventListener("submit", function (e) {
    e.preventDefault();
    var d = new FormData(f), err = document.getElementById("form-error");
    var name = (d.get("name") || "").trim(), phone = (d.get("phone") || "").trim();
    if (!name || !phone) { err.hidden = false; return; }
    err.hidden = true;
    var text = "Assalam o Alaikum, my name is " + name + ". My business: " + d.get("type") + ". Phone: " + phone + "." +
      ((d.get("msg") || "").trim() ? "\n" + d.get("msg").trim() : "");
    window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(text), "_blank", "noopener");
  });
})();
