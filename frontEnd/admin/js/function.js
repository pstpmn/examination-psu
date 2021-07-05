const getAddressGlobal = () => {
    return `<div class="row">

        <div class="col-md-2">
            <div class="form-floating mb-3">
                <input class="form-control" id="country" disabled type="text"
                    placeholder="username" />
                <label for="username">ประเทศ (ต้นทาง)</label>
            </div>
        </div>


        <div class="col-md-2">
            <div class="form-floating mb-3">
                <input class="form-control" id="province" type="text"
                    placeholder="username" />
                <label for="username">จังหวัด (ต้นทาง)</label>
            </div>
        </div>

        <div class="col-md-2">
            <div class="form-floating mb-3">
                <input class="form-control" id="district" type="text"
                    placeholder="username" />
                <label for="username">อำเภอ (ต้นทาง)</label>
            </div>
        </div>


        <div class="col-md-2">
            <div class="form-floating mb-3">
                <input class="form-control" id="amphure" type="text"
                    placeholder="username" />
                <label for="username">ตำบล (ต้นทาง)</label>
            </div>
        </div>
    </div>`;
}


const getAddressE = () => {
    return `<div class="row" >

        <div class="col-md-2">
            <div class="form-floating mb-3">
                <select class="form-select" id="province-e" onclick="getAmphures('end')"
                    aria-label="Floating label select example">
                    <option value="">- เลือกจังหวัด -</option>
                </select>
                <label for="floatingSelect">จังหวัด (ต้นทาง)</label>
            </div>
        </div>

        <div class="col-md-2">
            <div class="form-floating mb-3">
                <select class="form-select" id="district-e" onclick="getDistricts('end')"
                    aria-label="Floating label select example">
                    <option value="">- เลือกอำเภอ -</option>
                </select>
                <label for="floatingSelect">อำเภอ (ต้นทาง)</label>
            </div>
        </div>

        <div class="col-md-2">
            <div class="form-floating mb-3">
                <select class="form-select" id="amphure-e"
                    aria-label="Floating label select example">
                    <option value="">- เลือกตำบล -</option>
                </select>
                <label for="floatingSelect">ตำบล</label>
            </div>
        </div>
    </div>`;
}


const getAddress = () => {
    return `<div div class="row" >

    <div class="col-md-2">
        <div class="form-floating mb-3">
            <select class="form-select" id="country"
                aria-label="Floating label select example">
                <option value="">- เลือกประเทศ -</option>
            </select>
            <label for="floatingSelect">ประเทศ (ต้นทาง)</label>
        </div>
    </div>


    <div class="col-md-2">
        <div class="form-floating mb-3">
            <select class="form-select" id="province" onclick="getAmphures()"
                aria-label="Floating label select example">
                <option value="">- เลือกจังหวัด -</option>
            </select>
            <label for="floatingSelect">จังหวัด (ต้นทาง)</label>
        </div>
    </div>

    <div class="col-md-2">
        <div class="form-floating mb-3">
            <select class="form-select" id="district" onclick="getDistricts()"
                aria-label="Floating label select example">
                <option value="">- เลือกอำเภอ -</option>
            </select>
            <label for="floatingSelect">อำเภอ (ต้นทาง)</label>
        </div>
    </div>

    <div class="col-md-2">
        <div class="form-floating mb-3">
            <select class="form-select" id="amphure"
                aria-label="Floating label select example">
                <option value="">- เลือกตำบล -</option>
            </select>
            <label for="floatingSelect">ตำบล</label>
        </div>
    </div>    
</div> `;
}



const getProvinces = async (end) => {
    try {
        const rawResponse = await fetch('http://127.0.0.1:3000/provinces', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })

        let content = await rawResponse.json();
        let value = document.getElementById('type').value;

        if (value === 'ต่างประเทศ') {
            content.data.forEach(element => {
                var x = document.getElementById("province-e");
                var option = document.createElement("option");
                option.text = element.name_th;
                option.value = element.id;
                x.add(option);
            });
        } else {
            content.data.forEach(element => {
                var x = document.getElementById("province-e");
                var option = document.createElement("option");
                option.text = element.name_th;
                option.value = element.id;
                x.add(option);
            });

            content.data.forEach(element => {
                var x = document.getElementById("province");
                var option = document.createElement("option");
                option.text = element.name_th;
                option.value = element.id;
                x.add(option);
            });
        }

    } catch (err) {
        console.log(err);
    }
}

const getAmphures = async (end) => {
    try {
        let id;
        let nameDom;
        if (end) {
            id = document.getElementById('province-e').value;
            nameDom = 'district-e';
        } else {
            id = document.getElementById('province').value;
            nameDom = 'district';
        }
        const rawResponse = await fetch('http://127.0.0.1:3000/amphures', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                provinceId: id
            })
        })

        let content = await rawResponse.json();
        document.getElementById(nameDom).innerHTML = "";

        var x = document.getElementById(nameDom);
        var option = document.createElement("option");
        option.text = '- เลือกอำเภอ -';
        option.value = '';
        x.add(option);

        content.data.forEach(element => {
            var x = document.getElementById(nameDom);
            var option = document.createElement("option");
            option.text = element.name_th;
            option.value = element.id;
            x.add(option);
        });


    } catch (err) {
        console.log(err);
    }
}


const getDistricts = async (end) => {
    try {
        let id;
        let nameDom;
        if (end) {
            id = document.getElementById('district-e').value;
            nameDom = 'amphure-e';

        } else {
            id = document.getElementById('district').value;
            nameDom = 'amphure';
        }
        const rawResponse = await fetch('http://127.0.0.1:3000/districts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amphureId: id
            })
        })

        let content = await rawResponse.json();
        document.getElementById(nameDom).innerHTML = "";
        var x = document.getElementById(nameDom);
        var option = document.createElement("option");
        option.text = '- เลือกตำบล -';
        option.value = '';
        x.add(option);
        content.data.forEach(element => {
            var x = document.getElementById(nameDom);
            var option = document.createElement("option");
            option.text = element.name_th;
            option.value = element.id;
            x.add(option);
        });

    } catch (err) {
        console.log(err);
    }
}
