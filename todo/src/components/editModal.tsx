import React from 'react';

type Props = {
    isOpen: boolean;
    newListName: string;
    onClose: () => void;
    onSave: () => void;
    onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const EditModal: React.FC<Props> = ({ isOpen, newListName, onClose, onSave, onChangeName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-90 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg">
                <h2 className="mb-4 text-lg font-bold text-black">Edit List Name</h2>
                <input
                    type="text"
                    value={newListName}
                    onChange={onChangeName}
                    className="p-3 w-full border border-gray-300 rounded-lg mb-4 text-black"
                />
                <div className="flex justify-end">
                    <button onClick={onSave} className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2">
                        Save
                    </button>
                    <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-lg">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
