import React from "react";
import {Form, Select, Space} from "antd";


interface IWoodSelect {
    InputField: {
        name?		: string,
        label?		: string,
        placeholder?: string,
        rules?		: any,
        id?			: string,
        type?		: string,
        disabled?	: boolean,
        value?      : any,
        options: { label: string; value: string }[];
        onChange: (value: any) => void;
    }
}

export const WoodSelect:React.FC<IWoodSelect> = ({ InputField }) => {
    const {
        name,
        options,
        value = null,
        rules = [],
        placeholder = "",
        disabled = false,
        onChange = ()=> { },
    } = InputField;

    return (
        <Space size={"small"} direction={"vertical"} className={"w-full"}>
            <Form.Item name={name} rules={rules}>
                <Select placeholder={placeholder} value={value} size={"large"} onChange={onChange} disabled={disabled}>
                    {
                        options.map((item, index) => (
                            <Select.Option key={index} value={item.value}>
                                {item.label}
                            </Select.Option>
                        ))
                    }
                </Select>
            </Form.Item>
        </Space>
    );
};
