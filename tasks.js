const radios = document.querySelectorAll('input[type="radio"][name="unit"]');
    const boxes = document.querySelectorAll('.box');
    const finalHeading = document.getElementById("finalHeading");
    const legendHighlight = document.getElementById("legendHighlight");
    const mostPopularInside = document.getElementById("mostPopularInside");
    const selectedUnitLabel = document.getElementById("selectedUnitLabel");
    const selectedPriceLabel = document.getElementById("selectedPriceLabel");

    radios.forEach(radio => {
      radio.addEventListener('change', () => {
        boxes.forEach(box => box.style.display = 'none');
        const selectedBox = document.getElementById(radio.value);
        selectedBox.style.display = 'block';

        const labelText = radio.labels[0].querySelector('strong')?.textContent || '';
        selectedUnitLabel.textContent = labelText;

        const priceElement = radio.closest(".price-box").querySelector(".price");
        const priceText = priceElement ? priceElement.textContent.trim() : '';
        selectedPriceLabel.textContent = `Price: ${priceText}`;

        if (radio.value === "unit2") {
          legendHighlight.style.backgroundColor = "hotpink";
          legendHighlight.style.color = "white";
          mostPopularInside.style.display = "block";
        } else {
          legendHighlight.style.backgroundColor = "";
          legendHighlight.style.color = "";
          mostPopularInside.style.display = "none";
        }
      });
    });

    function addToCart() {
      const selectedRadio = document.querySelector('input[name="unit"]:checked');
      if (!selectedRadio) {
        alert("Please select a unit first.");
        return;
      }

      const unitId = selectedRadio.value;
      const table = document.getElementById(unitId + "Table").querySelector("tbody");
      const rows = table.querySelectorAll("tr");

      const entries = [];
      rows.forEach((row, i) => {
        const selects = row.querySelectorAll("select");
        const size = selects[0].value;
        const color = selects[1].value;
        entries.push(`Row ${i + 1}: Size = ${size}, Color = ${color}`);
      });

      const finalBox = document.getElementById("finalBox");
      finalBox.style.display = "block";
      finalHeading.style.display = "block";

      const entry = document.createElement("div");
      entry.className = "final-entry";
      entry.textContent = `${selectedRadio.labels[0].innerText} → ${entries.join(" | ")}`;
      finalBox.appendChild(entry);
    }