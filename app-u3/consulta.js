// Uso: node consulta.js "MATCH ... RETURN ..."
const { driver, cerrar } = require("./bd");
async function main() {
  const q = process.argv[2];
  const r = await driver.executeQuery(q, {});
  console.log(r.records.map(x => JSON.stringify(x.toObject())).join("\n"));
  const p = r.summary.profile;
  if (p) {
    (function mostrar(n, nivel) {
      console.log("  ".repeat(nivel) + n.operatorType +
        " · dbHits: " + n.dbHits + " · filas: " + n.rows);
      for (const h of n.children) mostrar(h, nivel + 1);
    })(p, 0);
  }
}
main().catch(e => console.error(e.code, e.message)).finally(cerrar);
