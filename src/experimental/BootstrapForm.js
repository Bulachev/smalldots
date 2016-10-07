import React from 'react'
import EnhancedForm from './EnhancedForm'
import Link from '../Link'

export default function BootstrapForm(props) {
  return (
    <EnhancedForm {...props}>
      {({ tabs, fields, isDirty, reset }) => (
        <div>
          {tabs && (
            <ul className="nav nav-tabs" style={{ marginBottom: 20 }}>
              {tabs.map(tab => (
                <li key={tab.label} className={tab.active ? 'active' : ''}>
                  <Link onClick={tab.onClick}>
                    {isDirty() && tab.errors && (
                      <i className="fa fa-exclamation-triangle text-danger" />
                    )}
                    {' '}
                    {tab.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <div className="row">
            {fields.map(field => {
              const error = isDirty(field.path) && field.error
              return (
                <div key={field.path} className={`col-xs-${field.size}`}>
                  <div className={`form-group ${error ? 'has-error' : ''}`}>
                    {field.label && <label className="control-label">{field.label}</label>}
                    {field.input}
                    {error && <span className="help-block">{error}</span>}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="btn-toolbar">
            <div className="btn-group">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
            <div className="btn-group">
              <button className="btn btn-default" type="button" onClick={reset}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </EnhancedForm>
  )
}