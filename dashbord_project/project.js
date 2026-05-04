const sidePanel = document.getElementById("sidebar");
const toggleBtn = document.getElementById("tregle");

toggleBtn.addEventListener("click", () => {
    if (!sidePanel.classList.contains("shrink")) {
        sidePanel.classList.add("shrink");
        sidePanel.addEventListener("transitionend", function handler() {
            sidePanel.classList.add("hidden");
            sidePanel.removeEventListener("transitionend", handler);
        });

    } 
});
const sidebtn = document.getElementById("side")
sidebtn.addEventListener("click", ()=>{
     sidePanel.classList.remove("hidden");
        requestAnimationFrame(() => {
            sidePanel.classList.remove("shrink");
        });
})
const employerpage = document.getElementById("employersPage")
const projectbtn = document.getElementById("projectbtn")
const projectpage = document.getElementById("projectPage")
const employersbtn = document.getElementById("employersbtn")
projectbtn.addEventListener("click",()=>{
employerpage.classList.add("hidden")
projectpage.classList.remove("hidden")

 projectbtn.classList.add("tab-active")
    employersbtn.classList.remove("tab-active")
})
employersbtn.addEventListener("click",()=>{
projectpage.classList.add("hidden")
employerpage.classList.remove("hidden")

 employersbtn.classList.add("tab-active")
    projectbtn.classList.remove("tab-active")
})

document.addEventListener("DOMContentLoaded", () => {
    projectpage.classList.remove("hidden")
    employerpage.classList.add("hidden")
    addpanel.classList.add("no-transition")
    addpanel.classList.add("shrink")
    requestAnimationFrame(() => {
        addpanel.classList.remove("no-transition")
    })

    projectbtn.classList.add("tab-active")
    employersbtn.classList.remove("tab-active")
})

const cancelbtn = document.getElementById("cancel-project-btn-form")
const addpanel = document.getElementById("add-project-panel")
cancelbtn.addEventListener("click",()=>{
    if (!addpanel.classList.contains("shrink")) {
        addpanel.classList.add("shrink");
        addpanel.addEventListener("transitionend", function handler() {
            addpanel.classList.add("hidden");
            addpanel.removeEventListener("transitionend", handler);
        });

    } 

})

const addprjbtn = document.getElementById("addprjbtn")
addprjbtn.addEventListener("click", ()=>{
     addpanel.classList.remove("hidden");
        requestAnimationFrame(() => {
            addpanel.classList.remove("shrink");
        });
})


const cancelebtn = document.getElementById("cancel-btn-form")
const addepanel = document.getElementById("add-employee-panel")
cancelebtn.addEventListener("click",()=>{
    if (!addepanel.classList.contains("shrink")) {
        addepanel.classList.add("shrink");
        addepanel.addEventListener("transitionend", function handler() {
            addepanel.classList.add("hidden");
            addepanel.removeEventListener("transitionend", handler);
        });

    } 

})

const addempbtn = document.getElementById("add-employee-btn")
addempbtn.addEventListener("click", ()=>{
     addepanel.classList.remove("hidden");
        requestAnimationFrame(() => {
            addepanel.classList.remove("shrink");
        });
})

let projectsByMonth = JSON.parse(localStorage.getItem("projectsByMonth")) || {}
let employeesByMonth = JSON.parse(localStorage.getItem("employeesByMonth")) || {}

const monthSelect = document.getElementById("month-select")

let now = new Date()
let currentMonth = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2, "0")}`

function populateMonthSelect(center = now, range = 12) {
    monthSelect.innerHTML = ""
    const year = center.getFullYear()
    const month = center.getMonth() // 0-based
    for (let offset = -range; offset <= range; offset++) {
        const d = new Date(year, month + offset, 1)
        const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2, "0")}`
        const opt = document.createElement("option")
        opt.value = key
        opt.textContent = d.toLocaleString(undefined, { month: "long", year: "numeric" })
        monthSelect.appendChild(opt)
    }
    monthSelect.value = currentMonth
}
populateMonthSelect()

monthSelect.addEventListener("change", () => {
    currentMonth = monthSelect.value
    renderProjects()
    renderEmployees()
})
function getCurrentProjects() {
    if (!projectsByMonth[currentMonth]) projectsByMonth[currentMonth] = []
    return projectsByMonth[currentMonth]
}
function saveProjects() {
    localStorage.setItem("projectsByMonth", JSON.stringify(projectsByMonth))
}

function getCurrentEmployees() {
    if (!employeesByMonth[currentMonth]) employeesByMonth[currentMonth] = []
    return employeesByMonth[currentMonth]
}
function saveEmployees() {
    localStorage.setItem("employeesByMonth", JSON.stringify(employeesByMonth))
}

const projectName = document.getElementById("project-name")
const companyName = document.getElementById("company-name")
const budgetprj = document.getElementById("project-budget")
const employeersCapasity = document.getElementById("employee-capacity")
const addprojectbtn = document.getElementById("add-project-btn-form")
const prjtable = document.getElementById("projectTable")

const employeeName = document.getElementById("name")
const employeeSurname = document.getElementById("surname")
const dateofbirht = document.getElementById("dob")
const position = document.getElementById("position")
const salary = document.getElementById("salary")
const addemplobtn = document.getElementById("add-btn-form")
const emptable = document.getElementById("emptable")

function renderProjects() {
    const list = getCurrentProjects()
    prjtable.innerHTML = ""

    list.forEach((p, index) => {
        const row = document.createElement("tr")
        row.innerHTML = `
            <td>${p.company || ""}</td>
            <td>${p.name || ""}</td>
            <td>${p.budget || "0"}</td>
            <td>${p.capacity || "0"}</td>
            <td>-</td>
            <td>$0.00</td>
            <td>
                <button class="delete-btn" data-id="${index}">Delete</button>
            </td>
        `
        prjtable.appendChild(row)
    })
    prjtable.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = Number(btn.dataset.id)
            getCurrentProjects().splice(id, 1)
            saveProjects()
            renderProjects()
        })
    })
}
addprojectbtn.addEventListener("click", () => {
    const list = getCurrentProjects()
    list.push({
        name: projectName.value,
        company: companyName.value,
        budget: budgetprj.value,
        capacity: employeersCapasity.value
    })
    saveProjects()
    renderProjects()

    projectName.value = ""
    companyName.value = ""
    budgetprj.value = ""
    employeersCapasity.value = ""
    addprojectbtn.disabled = true
})
const form = document.getElementById("add-project-form")
if (form) {
    form.addEventListener("input", () => {
        addprojectbtn.disabled = !form.checkValidity()
    })
}
function renderEmployees() {
    const list = getCurrentEmployees()
    emptable.innerHTML = ""

    list.forEach((e, index) => {
        const row = document.createElement("tr")
        row.innerHTML = `
            <td>${e.name}</td>
            <td>${e.surname}</td>
            <td>${e.dob}</td>
            <td class="editable-cell editable-position">${e.position}</td>
            <td class="editable-cell editable-salary">${e.salary}</td>
            <td>${e.salary/2}</td>
            <td>-</td>
            <td class="minus"> ${e.salary/2}</td>
            <td>
                <button class="delete-emp-btn" data-id="${index}">Delete</button>
            </td>
        `
        emptable.appendChild(row)
        row.querySelector(".editable-position").addEventListener("click", () => {
            makeEditable(row.querySelector(".editable-position"), "position", index)
        })
        row.querySelector(".editable-salary").addEventListener("click", () => {
            makeEditable(row.querySelector(".editable-salary"), "salary", index)
        })
    })
    emptable.querySelectorAll(".delete-emp-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = Number(btn.dataset.id)
            getCurrentEmployees().splice(id, 1)
            saveEmployees()
            renderEmployees()
        })
    })
}
addemplobtn.addEventListener("click", () => {
    const list = getCurrentEmployees()
    list.push({
        name: employeeName.value,
        surname: employeeSurname.value,
        dob: dateofbirht.value,
        position: position.value,
        salary: salary.value
    })
    saveEmployees()
    renderEmployees()

    employeeName.value = ""
    employeeSurname.value = ""
    dateofbirht.value = ""
    position.value = ""
    salary.value = ""
    addemplobtn.disabled = true
})

const empForm = document.getElementById("add-employee-form")
if (empForm) {
    empForm.addEventListener("input", () => {
        addemplobtn.disabled = !empForm.checkValidity()
    })
}

function makeEditable(td, field, id) {
    if (td.classList.contains("editing")) {
        save()
        return
    }

    const oldValue = td.textContent.trim()
    td.classList.add("editing")

    let editor = ""
    if (field === "position") {
        editor = `
            <select class="edit-input">
                <option value="Junior" ${oldValue === "Junior" ? "selected" : ""}>Junior</option>
                <option value="Middle" ${oldValue === "Middle" ? "selected" : ""}>Middle</option>
                <option value="Senior" ${oldValue === "Senior" ? "selected" : ""}>Senior</option>
                <option value="Lead" ${oldValue === "Lead" ? "selected" : ""}>Lead</option>
                <option value="Architect" ${oldValue === "Architect" ? "selected" : ""}>Architect</option>
                <option value="BO" ${oldValue === "BO" ? "selected" : ""}>BO</option>
            </select>
        `
    } else {
        editor = `<input type="text" class="edit-input" value="${oldValue}">`
    }

    td.innerHTML = `
        <span class="text-value">${oldValue}</span>
        ${editor}
    `

    const input = td.querySelector(".edit-input")
    input.focus()
    input.addEventListener("blur", save)
    input.addEventListener("keydown", e => {
        if (e.key === "Enter") save()
    })

    function save() {
        const newValue = input.value.trim()
        td.classList.remove("editing")
        td.innerHTML = newValue
        const list = getCurrentEmployees()
        list[id][field] = newValue
        saveEmployees()
    }
}
renderProjects()
renderEmployees()

document.addEventListener("DOMContentLoaded", function() {

    const projectSortHeaders = document.querySelectorAll("#projects-table th[data-sort]");
    projectSortHeaders.forEach(header => {
        header.style.cursor = "pointer";
        header.addEventListener("click", function() {
            const sortKey = this.getAttribute("data-sort");
            sortProjects(sortKey);
        });
    });

    const employeeSortHeaders = document.querySelectorAll("#employees-table th[data-sort]");
    employeeSortHeaders.forEach(header => {
        header.style.cursor = "pointer";
        header.addEventListener("click", function() {
            const sortKey = this.getAttribute("data-sort");
            sortEmployees(sortKey);
        });
    });
});

let projectSortState = { key: null, dir: 1 };
let employeeSortState = { key: null, dir: 1 };

function sortProjects(key) {
    const projects = getCurrentProjects();

    if (projectSortState.key === key) {
        projectSortState.dir = -projectSortState.dir;
    } else {
        projectSortState.dir = 1;
        projectSortState.key = key;
    }
    
    projects.sort((a, b) => {
        let valA, valB;

        if (key === "company") {
            valA = a.company || "";
            valB = b.company || "";
        } else if (key === "projectName" || key === "name") {
            valA = a.name || "";
            valB = b.name || "";
        } else if (key === "budget") {
            valA = parseFloat(a.budget) || 0;
            valB = parseFloat(b.budget) || 0;
        } else if (key === "employeeCapacity") {
            valA = parseFloat(a.capacity) || 0;
            valB = parseFloat(b.capacity) || 0;
        } else if (key === "estimatedIncome") {
            valA = 0; // Пока что 0
            valB = 0;
        } else {
            valA = a[key] || "";
            valB = b[key] || "";
        }
        if (typeof valA === "number" && typeof valB === "number") {
            return (valA - valB) * projectSortState.dir;
        } else {
            const strA = String(valA).toLowerCase();
            const strB = String(valB).toLowerCase();
            if (strA < strB) return -1 * projectSortState.dir;
            if (strA > strB) return 1 * projectSortState.dir;
            return 0;
        }
    });
    
    saveProjects();
    renderProjects();
    updateSortIndicators("#projects-table", projectSortState);
}

function sortEmployees(key) {
    const employees = getCurrentEmployees();
    
    // Определяем направление сортировки
    if (employeeSortState.key === key) {
        employeeSortState.dir = -employeeSortState.dir;
    } else {
        employeeSortState.dir = 1;
        employeeSortState.key = key;
    }
    
    employees.sort((a, b) => {
        let valA, valB;
        if (key === "name") {
            valA = a.name || "";
            valB = b.name || "";
        } else if (key === "surname") {
            valA = a.surname || "";
            valB = b.surname || "";
        } else if (key === "age") {

            const ageA = a.dob ? Math.floor((Date.now() - Date.parse(a.dob)) / 31557600000) : 0;
            const ageB = b.dob ? Math.floor((Date.now() - Date.parse(b.dob)) / 31557600000) : 0;
            valA = ageA;
            valB = ageB;
        } else if (key === "position") {
            valA = a.position || "";
            valB = b.position || "";
        } else if (key === "salary") {
            valA = parseFloat(a.salary) || 0;
            valB = parseFloat(b.salary) || 0;
        } else if (key === "estimatedPayment") {
            valA = (parseFloat(a.salary) || 0) / 2;
            valB = (parseFloat(b.salary) || 0) / 2;
        } else if (key === "projectedIncome") {
            valA = (parseFloat(a.salary) || 0) / 2;
            valB = (parseFloat(b.salary) || 0) / 2;
        } else {
            valA = a[key] || "";
            valB = b[key] || "";
        }

        if (typeof valA === "number" && typeof valB === "number") {
            return (valA - valB) * employeeSortState.dir;
        } else {
            const strA = String(valA).toLowerCase();
            const strB = String(valB).toLowerCase();
            if (strA < strB) return -1 * employeeSortState.dir;
            if (strA > strB) return 1 * employeeSortState.dir;
            return 0;
        }
    });
    
    saveEmployees();
    renderEmployees();
    updateSortIndicators("#employees-table", employeeSortState);
}

function updateSortIndicators(tableSelector, state) {
    const table = document.querySelector(tableSelector);
    if (!table) return;

    table.querySelectorAll("th[data-sort]").forEach(th => {
        th.classList.remove("sorted-asc", "sorted-desc");
        const icon = th.querySelector(".sort-icon");
        if (icon) icon.textContent = "⇅";
    });

    const currentTh = table.querySelector(`th[data-sort="${state.key}"]`);
    if (currentTh) {
        currentTh.classList.add(state.dir === 1 ? "sorted-asc" : "sorted-desc");
        const icon = currentTh.querySelector(".sort-icon");
        if (icon) icon.textContent = state.dir === 1 ? "↑" : "↓";
    }
}