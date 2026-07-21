function updateProjectLogoClass() {
  const body = document.body;
  const path = window.location.pathname.toLowerCase();

  body.classList.remove(
    "project-marmovr",
    "project-nemovr",
    "project-marmoroomrecord",
    "project-nemoreefrecord"
  );

  if (path.includes("/marmoroomrecord/")) {
    body.classList.add("project-marmoroomrecord");
  } else if (path.includes("/nemoreefrecord/")) {
    body.classList.add("project-nemoreefrecord");
  } else if (path.includes("/marmovr/")) {
    body.classList.add("project-marmovr");
  } else if (path.includes("/nemovr/")) {
    body.classList.add("project-nemovr");
  }
}

/*
 * Material for MkDocs utilise document$ lors de la navigation instantanée.
 * Le fallback DOMContentLoaded permet aussi au code de fonctionner sans
 * navigation instantanée.
 */
if (typeof document$ !== "undefined") {
  document$.subscribe(updateProjectLogoClass);
} else {
  document.addEventListener("DOMContentLoaded", updateProjectLogoClass);
}