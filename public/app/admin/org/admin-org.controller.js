(function () {
    'use strict';
    angular
        .module('admin.org')
        .controller('OrgController', OrgController);

    function OrgController($scope, $location, adminOrgService) {
        var vm = this;
        vm.openModalEditProcess = openModalEditProcess;
        vm.openModalDelete = openModalDelete;
        vm.openModalEdit = openModalEdit;
        vm.openModalAdd = openModalAdd;
        vm.getProcessByOrganization = getProcessByOrganization;
        vm.updateCurrentOrg = updateCurrentOrg;
        vm.confirmEdit = confirmEdit;
        vm.confirmAdd = confirmAdd;
        vm.deleteOrg = deleteOrg;
        vm.getProcessesSelected = getProcessesSelected;
        vm.openModalAddProcess = openModalAddProcess;
        vm.confirmAddProcess = confirmAddProcess;
        vm.init = init;

        vm.organizations = {};
        vm.allProcesses = {};

        vm.currentOrg = {};

        vm.processByOrg = {};

        vm.processesSelected = [];


        //Call init
        vm.init();

        function init() {
            //Get Organizations
            adminOrgService.getOrganizations()
                .then(function (data) {
                    console.log("Organizations");
                    console.log(data);
                    vm.organizations = data;
                })
                .catch(function (error) {
                    console.log(error);
                });

            adminOrgService.getProcesses()
                .then(function (data) {
                    console.log("Processes");
                    console.log(data);
                    vm.allProcesses = data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        function getProcessesSelected() {
            var arr = [];
            for (var i in vm.allProcesses) {
                if (vm.allProcesses[i].SELECTED == 1) {
                    arr.push(vm.allProcesses[i].processId);
                }
            }
            console.log(arr);
            vm.processesSelected = arr;
        }

        function confirmEdit() {
            var valid = $('.edit.form').form('validate form');
            if (valid) {
                var form = $('.edit.form');
                var allFields = form.form('get values');
                var dataStructure = {
                    "id": vm.currentOrg.id,
                    "name": allFields.name,
                    "description": allFields.description,
                    "agent": allFields.agent,
                    "agentMail": allFields.agentMail
                }
                adminOrgService.organizationUpdate(dataStructure)
                    .then(function (data) {
                        console.log("Organization Edited");
                        $('.edit.modal').modal('hide');
                        location.reload();
                    })
                    .catch(function (error) {
                        console.log(error);
                        alert("Error al editar");
                    });
            }
        }

        function confirmAddProcess() {
            var valid = $('.add_process.form').form('validate form');
            if (valid) {
                var form = $('.add_process.form');
                var allFields = form.form('get values');
                var dataStructure = {
                    "name": allFields.name,
                    "description": allFields.description
                }
                adminOrgService.createProcess(dataStructure)
                    .then(function (data) {
                        console.log("Process Created");
                        $('.add_process.modal').modal('hide');
                        location.reload();
                    })
                    .catch(function (error) {
                        console.log(error);
                        alert("Error al crear");
                    });
            }
        }

        function confirmAdd() {
            var valid = $('.ui.add.form').form('validate form');
            if (valid) {
                var form = $('.add.form');
                var allFields = form.form('get values');
                var dataStructure = {
                    "name": allFields.name,
                    "description": allFields.description,
                    "agent": allFields.agent,
                    "agentMail": allFields.agentMail
                }
                adminOrgService.organizationCreate(dataStructure)
                    .then(function (data) {
                        console.log("Organization Created");
                        $('.add.modal').modal('hide');
                        location.reload();
                    })
                    .catch(function (error) {
                        console.log(error);
                        alert("Error al crear");
                    });
            }
        }

        function deleteOrg() {
            adminOrgService.organizationDelete(vm.currentOrg.id)
                .then(function (data) {
                    console.log("Organization Deleted");
                    $('.basic.modal').modal('hide');
                    location.reload();
                })
                .catch(function (error) {
                    console.log(error);
                    alert("Error al eliminar");
                });
        }

        function updateCurrentOrg(id, agent, agentMail, description, name) {
            vm.currentOrg.id = id;
            vm.currentOrg.agent = agent;
            vm.currentOrg.agentMail = agentMail;
            vm.currentOrg.description = description;
            vm.currentOrg.name = name;
        }

        function getProcessByOrganization(id) {
            adminOrgService.getProcessByOrganization(id)
                .then(function (data) {
                    console.log("Processes by Organizations");
                    console.log(data);
                    vm.processByOrg = data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        function openModalAddProcess() {
            $('.add_process.modal')
                .modal({
                    blurring: true
                })
                .modal('setting', 'closable', false)
                .modal('show');
        }

        function openModalEditProcess(organizationId) {
            vm.getProcessByOrganization(organizationId);
            vm.updateCurrentOrg(organizationId, "", "", "", "");
            $('.process.modal')
                .modal({
                    blurring: true
                })
                .modal('setting', 'closable', false)
                .modal('show');
        }

        function openModalDelete(id, agent, agentMail, description, name) {
            vm.updateCurrentOrg(id, agent, agentMail, description, name);
            $('.basic.modal').modal('show');
        }

        function openModalEdit(id, agent, agentMail, description, name) {
            vm.updateCurrentOrg(id, agent, agentMail, description, name);
            $('.edit.modal')
                .modal({
                    blurring: true
                })
                .modal('setting', 'closable', false)
                .modal('show');
        }

        function openModalAdd() {
            $('.add.modal')
                .modal({
                    blurring: true
                })
                .modal('setting', 'closable', false)
                .modal('show');
        }


        $('.edit.form')
            .form({
                fields: {
                    name: 'empty',
                    agent: 'empty',
                    agentMail: 'empty',
                    description: 'empty'
                }
            })
            ;

        $('.add.form')
            .form({
                fields: {
                    name: 'empty',
                    agent: 'empty',
                    agentMail: 'empty',
                    description: 'empty'
                }
            })
            ;

        $('.add_process.form')
            .form({
                fields: {
                    name: 'empty',
                    description: 'empty'
                }
            })
            ;
    }
})();