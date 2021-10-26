export function minifyNumber(num: number): string {
  const toSymbol = (divider: number, symbol: string) => {
    let res: string | number = num / divider;
    if (res % 1 !== 0) {
      res = res.toFixed(2);
      if (res.endsWith("0")) {
        res = res.substring(0, res.length - 1);
      }
    }

    return res + symbol;
  };
  const limits = [
    [1000000000, "B"],
    [1000000, "M"],
    [1000, "K"],
  ];
  for (var i = 0; i < limits.length; i++) {
    let limit = limits[i];
    if (num >= limit[0]) {
      return toSymbol(+limit[0], "" + limit[1]);
    }
  }
  return num + "";
}

export function getVolumeSVG(value: number): string {
  const activeBar = value / 200000; // FOR THE MAX 1M, EACH 200K DEFINES A BAR
  const activeClass = (i: number) => {
    return activeBar >= i ? "" : 'class="opacity-10"';
  };

  return `
    <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 18C0 16.8954 0.895431 16 2 16H4V20H0V18Z" fill="#9999CC" />
      <path d="M5 14C5 12.8954 5.89543 12 7 12H9V20H5V14Z" fill="#9999CC" ${activeClass(
        2
      )}/>
      <path d="M10 10C10 8.89543 10.8954 8 12 8H14V20H10V10Z" fill="#9999CC" ${activeClass(
        3
      )}/>
      <path d="M15 6C15 4.89543 15.8954 4 17 4H19V20H15V6Z" fill="#9999CC" ${activeClass(
        4
      )}/>
      <path d="M20 2C20 0.895431 20.8954 0 22 0H24V20H20V2Z" fill="#9999CC" ${activeClass(
        5
      )}/>
    </svg>     
  `;
}

export function cellBadgeRenderer({ value = 0 }): string {
  let colorClasses = "";
  if (value > 0) colorClasses = "badge-success";
  if (value < 0) colorClasses = "badge-danger";
  return `<span class='badge ${colorClasses}'>${
    (value > 0 ? "+" : "") + value
  }</span>`;
}
