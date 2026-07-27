import Link from "next/link";

export function LegalTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="legal-table-wrap">
      <table>
        <thead>
          <tr>
            {headers.map((header) => <th key={header}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("-")}>
              {row.map((cell, index) => <td key={`${cell}-${index}`}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function EmailLink() {
  return <a href="mailto:hello@jazari.xyz">hello@jazari.xyz</a>;
}

export function PrivacyLink() {
  return <Link href="/privacy-policy">Privacy Policy</Link>;
}
