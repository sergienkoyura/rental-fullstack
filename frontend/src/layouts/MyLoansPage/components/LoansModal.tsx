import CurrentLoans from "../../../models/CurrentLoans"

export const LoansModal: React.FC<{ loansCurrentLoan: CurrentLoans, mobile: boolean, returnItem: any, renewItem: any }> = (props) => {
    return (
        <div className="modal fade" id={props.mobile ? `mobilemodal${props.loansCurrentLoan.item.id}` :
            `modal${props.loansCurrentLoan.item.id}`} data-bs-backdrop='static' data-bs-keyboard='false'
            aria-labelledby='staticBackdropLabel' aria-label="true" key={props.loansCurrentLoan.item.id}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">
                            Loan Options
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss='modal' aria-label="Close">

                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div className="mt-3">
                                <div className="row">
                                    <div className="col-2">
                                        {props.loansCurrentLoan.item.img ?
                                            <img src={"data:image/jpeg;base64," + props.loansCurrentLoan.item.img.data} width={56} height={87} alt="Item" />
                                            :
                                            <img src={require('./../../../Images/Images/primary.jpg')} width={56} height={87} alt="Item" />
                                        }
                                    </div>
                                    <div className="col-10">
                                        <h6>{props.loansCurrentLoan.item.admin}</h6>
                                        <h4>{props.loansCurrentLoan.item.title}</h4>
                                    </div>
                                </div>
                                <hr />
                                {props.loansCurrentLoan.daysLeft > 0 &&
                                    <p className="text-secondary">
                                        Due in {props.loansCurrentLoan.daysLeft} days.
                                    </p>
                                }
                                {props.loansCurrentLoan.daysLeft == 0 &&
                                    <p className="text-success">
                                        Due Today.
                                    </p>
                                }
                                {props.loansCurrentLoan.daysLeft < 0 &&
                                    <p className="text-danger">
                                        Past due by {props.loansCurrentLoan.daysLeft} days.
                                    </p>
                                }
                                <div className="list-group mt-3">
                                    <button data-bs-dismiss='modal' className="list-group-item list-group-item-action" aria-current='true'
                                        onClick={() => props.returnItem(props.loansCurrentLoan.item.id)}>
                                        Return Item
                                    </button>
                                    <button data-bs-dismiss='modal'
                                        className={props.loansCurrentLoan.daysLeft < 0 ?
                                            'list-group-item list-group-item-action inactive-link' :
                                            'list-group-item list-group-item-action'
                                        } onClick={props.loansCurrentLoan.daysLeft >= 0 ?
                                            (() => props.renewItem(props.loansCurrentLoan.item.id)) :
                                            (e => e.preventDefault())}>
                                        {props.loansCurrentLoan.daysLeft < 0 ?
                                            'Late dues cannot be renewed' :
                                            'Renew loan for 7 days'
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss='modal'>
                            Close
                        </button>
                    </div>
                </div>


            </div>
        </div>
    )
}