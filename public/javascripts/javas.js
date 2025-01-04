
  function confirmDelete() {
    if (confirm("Would you like to delete this?")) {
      // Proceed with the deletion (e.g., send a request to the server)
      alert("Item deleted successfully!"); 
    } else {
      // User canceled the deletion
    }
  }
  function toggleControls(id) {
    const increaseBtn = document.getElementById(`increase-${id}`);
    const decreaseBtn = document.getElementById(`decrease-${id}`);
  
    if (increaseBtn.disabled && decreaseBtn.disabled) {
      // Enable buttons
      increaseBtn.disabled = false;
      decreaseBtn.disabled = false;
    } else {
      // Disable buttons
      increaseBtn.disabled = true;
      decreaseBtn.disabled = true;
    }
  }
  
  function increaseQuantity(id) {
    if (!document.getElementById(`increase-${id}`).disabled) {
      fetch(`/admin/addQuantity/${id}`, {
        method: "POST",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            window.location.reload(); // Reload the page to reflect changes
          } else {
            alert("Failed to increase quantity!");
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  }
  
  function decreaseQuantity(id) {
    if (!document.getElementById(`decrease-${id}`).disabled) {
      fetch(`/decrement-quantity/${id}`, {
        method: "POST",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            window.location.reload(); // Reload the page to reflect changes
          } else {
            alert("Failed to decrease quantity!");
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  }
  