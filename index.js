document.addEventListener("DOMContentLoaded", function () {
  let currentStep = 1;
  const totalSteps = 4;

  // Fetch country data
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      const countryDropdown = document.getElementById("countryDropdown");
      const countryOptions = document.createElement("div");

      // Add a class to the countryOptions container
      countryOptions.classList.add("countrydropdown-options");
      console.log(data[0]);

      data.sort((a, b) => {
        const nameA = a.name.common.toUpperCase();
        const nameB = b.name.common.toUpperCase();
        return nameA.localeCompare(nameB);
      });
      showSelectedImage(
        data[0].flags.png,
        data[0].idd.root + data[0].idd.suffixes[0]
      );

      data.forEach((country) => {
        const option = document.createElement("div");
        option.value = country.cca2;
        option.classList.add("country-option");

        const label = document.createElement("label");

        const img = document.createElement("img");
        img.src = country.flags.png;
        img.alt = country.name.common;
        img.classList.add("country-flag");
        label.appendChild(img);

        option.appendChild(label);
        const span1 = document.createElement("span");
        span1.classList.add("country-name");
        span1.appendChild(document.createTextNode(country.name.common));
        option.appendChild(span1);
        const span2 = document.createElement("span");
        span2.classList.add("country-code");
        span2.appendChild(
          document.createTextNode(
            `${
              country.idd.root +
              (country.idd.suffixes && country.idd.suffixes[0])
            }`
          )
        );
        option.appendChild(span2);
        option.addEventListener("click", () => {
          showSelectedImage(
            country.flags.png,
            country.idd.root + country.idd.suffixes[0]
          );
          countryOptions.classList.remove("open");
        });

        countryOptions.appendChild(option);
      });
      countryDropdown.appendChild(countryOptions);

      document
        .getElementById("selectedImageContainer")
        .addEventListener("click", () => {
          countryOptions.classList.toggle("open");
        });
    })
    .catch((error) => console.error("Error fetching data:", error));

  document.addEventListener("click", (event) => {
    const countryOptions = document.querySelector(".countrydropdown-options");
    const countryDropdown = document.getElementById("countryDropdown");
    if (
      !countryDropdown.contains(event.target) &&
      countryOptions.classList.contains("open")
    ) {
      countryOptions.classList.remove("open");
    }
  });
  // Function to show the selected country's image
  function showSelectedImage(imageSrc, countrycode) {
    const selectedImageContainer = document.getElementById(
      "selectedImageContainer"
    );

    // Remove previous image if exists
    selectedImageContainer.innerHTML = "";
    const countrycodediv = document.createElement("div");
    countrycodediv.appendChild(document.createTextNode(countrycode));

    countrycodediv.classList.add("country-code");
    selectedImageContainer.appendChild(countrycodediv);
    countrycodediv.id = "step-1-country-code";

    const selectedImage = document.createElement("img");
    selectedImage.src = imageSrc;
    selectedImage.alt = "Selected Country Flag";
    selectedImage.classList.add("country-flag");
    selectedImageContainer.appendChild(selectedImage);
  }

  function showStep(stepNumber) {
    for (let i = 1; i <= totalSteps; i++) {
      const step = document.getElementById(`costformstep-${i}`);
      const step1 = document.getElementById(`costform_1_step${i}`);
      const heading = document.getElementById(`costform_2_${i}`);
      const nextButton = document.getElementById("nextBtn-1");
      const mobilenextButton = document.getElementById("mobile-nextBtn-1");
      const getacall = document.getElementById("costformgetacall");
      const mobilegetacall = document.getElementById("mobile-costformgetacall");
      if (stepNumber == 3) {
        nextButton.style.display = "none";
        getacall.style.display = "flex";
        mobilegetacall.style.display = "flex";
        mobilenextButton.style.display = "none";
      } else {
        nextButton.style.display = "flex";
        getacall.style.display = "none";
        mobilegetacall.style.display = "none";
        mobilenextButton.style.display = "flex";
      }

      if (i === stepNumber) {
        if (step) {
          step.style.display = "block";
        }
        if (step1) {
          step1.style.display = "flex";
        }
        if (heading) {
          heading.style.display = "block";
        }
      } else {
        if (step) {
          step.style.display = "none";
        }
        if (step1) {
          step1.style.display = "none";
        }
        if (heading) {
          heading.style.display = "none";
        }
      }
    }
  }

  function updateStepNavigation() {
    const prevButton = document.getElementById("prevBtn-1");
    const nextButton = document.getElementById("nextBtn-1");
    const mobileprev = document.getElementById("mobile-prevBtn-1");
    const mobilenextButton = document.getElementById("mobile-nextBtn-1");

    if (currentStep === 1) {
      prevButton.style.background = "#F5F5F5";
      prevButton.style.color = "#C1C1C1";
      mobileprev.style.background = "#F5F5F5";
      mobileprev.style.color = "#C1C1C1";
    } else {
      prevButton.style.background = "#F5F5F5";
      prevButton.style.color = "#000";
      mobileprev.style.background = "#F5F5F5";
      mobileprev.style.color = "#000";
    }

    if (currentStep === totalSteps) {
      nextButton.style.color = "#C1C1C1";
      mobilenextButton.style.color = "#C1C1C1";
    } else {
      nextButton.style.color = "#FFF";
      mobilenextButton.style.color = "#FFF";
    }
  }

  function submitform() {
    const input_1 = document.getElementById("coststep1_3").value;
    const input_4 = document.getElementById("coststep1_4").value;
    const coststep1_3_1 = document.getElementById("coststep1_3_1").checked
      ? "E-Commerce"
      : "";
    const coststep1_3_2 = document.getElementById("coststep1_3_2").checked
      ? "Wholesale trade"
      : "";
    const coststep1_3_3 = document.getElementById("coststep1_3_3").checked
      ? "Marketing"
      : "";
    const coststep1_3_4 = document.getElementById("coststep1_3_4").checked
      ? "Retail"
      : "";
    const coststep1_3_5 = document.getElementById("coststep1_3_5").checked
      ? "Logistics"
      : "";
    const coststep1_3_6 = document.getElementById("coststep1_3_6").checked
      ? "General trade"
      : "";
    const coststep1_3_7 = document.getElementById("coststep1_3_7").checked
      ? "Consultancy"
      : "";
    const input_9 = document.getElementById("coststep1_2").value;
    const input_6 = document.getElementById("coststep2_1").value;
    const input_7 = document.getElementById("coststep2_2").value;
    const input_8 = document.getElementById("coststep2_3").value;
    const input_10_1 = document.getElementById("input_10_1").checked
      ? "true"
      : "";
    const countrycode = document.getElementById(
      "step-1-country-code"
    ).textContent;
    const formdata = {
      input_1,
      input_4,
      ["input_3.1"]: coststep1_3_1,
      ["input_3.2"]: coststep1_3_2,
      ["input_3.3"]: coststep1_3_3,
      ["input_3.4"]: coststep1_3_4,
      ["input_3.5"]: coststep1_3_5,
      ["input_3.6"]: coststep1_3_6,
      ["input_3.7"]: coststep1_3_7,
      ["input_10.1"]: input_10_1,
      input_9,
      input_6,
      input_7:countrycode+input_7,
      input_8,
    };
    fetch(
      "https://test.wp.levitation.co.in/wp-json/gf/v2/forms/12/submissions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((res) => {
        if (currentStep < totalSteps) {
          currentStep++;
          showStep(currentStep);
          updateStepNavigation();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  showStep(currentStep);
  updateStepNavigation();

  document.getElementById("nextBtn-1").addEventListener("click", function () {
    // if (currentStep == 1) {
    //     if (document.getElementById('coststep1_1').value == "") {
    //         return false;
    //     }
    //     if (document.getElementById('coststep1_2').value == "") {
    //         return false;
    //     }
    //     if (document.getElementById('coststep1_3').value == "") {
    //         return false;
    //     }
    //     if (document.getElementById('coststep1_4').value == "") {
    //         return false;
    //     }

    // } else if (currentStep == 2) {
    //     if (document.getElementById('coststep2_1').value == "") {
    //         return false;
    //     }
    //     if (document.getElementById('coststep2_2').value == "") {
    //         return false;
    //     }
    //     if (document.getElementById('coststep2_3').value == "") {
    //         return false;
    //     }
    // }
    if (currentStep < totalSteps) {
      currentStep++;
      showStep(currentStep);
      updateStepNavigation();
    }
  });

  document.getElementById("prevBtn-1").addEventListener("click", function () {
    if (currentStep > 1) {
      currentStep--;
      showStep(currentStep);
      updateStepNavigation();
    }
  });
  document
    .getElementById("mobile-nextBtn-1")
    .addEventListener("click", function () {
      //   if (currentStep == 1) {
      //     if (document.getElementById("coststep1_1").value == "") {
      //       return false;
      //     }
      //     if (document.getElementById("coststep1_2").value == "") {
      //       return false;
      //     }
      //     if (document.getElementById("coststep1_3").value == "") {
      //       return false;
      //     }
      //     if (document.getElementById("coststep1_4").value == "") {
      //       return false;
      //     }
      //   } else if (currentStep == 2) {
      //     if (document.getElementById("coststep2_1").value == "") {
      //       return false;
      //     }
      //     if (document.getElementById("coststep2_2").value == "") {
      //       return false;
      //     }
      //     if (document.getElementById("coststep2_3").value == "") {
      //       return false;
      //     }
      //   }
      if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
        updateStepNavigation();
      }
    });

  document
    .getElementById("mobile-prevBtn-1")
    .addEventListener("click", function () {
      if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
        updateStepNavigation();
      }
    });
  document
    .getElementById("costformgetacall")
    .addEventListener("click", function () {
      submitform(currentStep);
    });
  document
    .getElementById("mobile-costformgetacall")
    .addEventListener("click", function () {
      submitform(currentStep);
    });
});

function toggleRotation(rotationIconId) {
  var icon = document.getElementById(rotationIconId);

  // Toggle rotation by adding or removing the 'rotate' class
  if (!icon.classList.contains("rotate")) {
    icon.style.transform = "rotate(0deg)";
    icon.classList.add("rotate");
  } else {
    icon.style.transform = "rotate(180deg)";
    icon.classList.remove("rotate");
  }
}

function toggleDetails(detailsId, rotationIconId) {
  toggleRotation(rotationIconId);
  var details = document.getElementById(detailsId);
  if (details.style.display === "block") {
    details.style.display = "none";
  } else {
    details.style.display = "block";
  }
}
