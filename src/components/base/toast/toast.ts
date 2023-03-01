type AlertType = "success" | "error" | "warn";
type Props = {
  type?: AlertType;
  message?: string;
};

const generateIcon = (type: AlertType | "close") => {
  const d = (() => {
    if (type === "success") {
      return "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z";
    } else if (type === "error" || type === "close") {
      return "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z";
    } else {
      return "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z";
    }
  })();
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); //Create a path in SVG's namespace
  svg.setAttributeNS(null, "fill", "currentColor");
  svg.setAttributeNS(null, "viewBox", "0 0 20 20");
  svg.classList.add("w-5", "h-5");
  var path = document.createElementNS("http://www.w3.org/2000/svg", "path"); //Create a path in SVG's namespace
  path.setAttribute("d", d);
  path.setAttribute("fill-rule", "evenodd");
  path.setAttribute("clip-rule", "evenodd");
  svg.appendChild(path);

  return svg;
};

const getWrapperIcon = (type: AlertType) => {
  const wrapperIcon = document.createElement("div");
  if (type === "success") {
    wrapperIcon.className =
      "inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200";
  }
  if (type === "error") {
    wrapperIcon.className =
      "inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200";
  }
  if (type === "warn") {
    wrapperIcon.className =
      "inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200";
  }

  const svgIcon = generateIcon(type);
  wrapperIcon.appendChild(svgIcon);

  return wrapperIcon;
};

export const toast = ({ type = "success", message }: Props, closeTime = 1000) => {
  const toastContainer = document.querySelector("#toast-container");
  if (!toastContainer) return;

  const wrapperAlert = document.createElement("div");
  wrapperAlert.classList.add(
    "fixed",
    "top-0",
    "left-1/2",
    "flex",
    "items-center",
    "w-full",
    "max-w-xs",
    "p-4",
    "mb-4",
    "text-gray-500",
    "bg-white",
    "rounded-lg",
    "shadow",
    "text-gray-800",
  );
  wrapperAlert.style.transform = "translate(-50%, 0)";
  wrapperAlert.style.zIndex = "10000";

  const wrapperIcon = getWrapperIcon(type);

  const wrapperMessage = document.createElement("div");
  wrapperMessage.className = "ml-3 text-sm font-normal";
  wrapperMessage.innerText = message || "";

  const closeButton = document.createElement("button");
  closeButton.className =
    "ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8 text-gray-800";
  closeButton.addEventListener('click', () => {
    wrapperAlert.remove();
  });
  closeButton.appendChild(generateIcon("close"));

  wrapperAlert.appendChild(wrapperIcon);
  wrapperAlert.appendChild(wrapperMessage);
  wrapperAlert.appendChild(closeButton);

  toastContainer.appendChild(wrapperAlert);
  setTimeout(() => {
    wrapperAlert.remove();
  }, closeTime);
};
