export class FormHandler {
    state = {
        modal: false,

    }

    toggleModal = () => {
        this.setState({modal: !this.state.modal});
    }

    
}