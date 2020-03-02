import models from './models.map.js';
import migrations from './migrations.map.js';

const systemFields = ['id', 'createdAt', 'updatedAt'];

const colors = {
  string: '#1abc9c',
  integer: '#e67e22',
  float: '#d35400',
  any: '#3498db',
  none: '#bdc3c7',
  relation: '#2980b9',
  pointer: '#34495e',
  background: '#ecf0f1',
  error: '#c0392b',
  info: '#2c3e50'
};

const appStyles = {
  fontFamily: 'sans-serif',
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap'
};

const rowStyle = {
  width: '100%',
  display: 'flex',
  flexWrap: 'no-wrap',
  justifyContent: 'flex-start',
  alignItems: 'center'
};

const titleStyle = {
  textAlign: 'center',
  width: '100%'
};

const columnStyle = {
  width: '50%',
  overflow: 'hidden'
};

const cardStyles = color => {
  return {
    padding: '10px',
    border: 'solid 1px gray',
    borderRadius: '5px',
    margin: '10px',
    background: color || colors.none,
    display: 'flex',
    flexWrap: 'wrap'
  };
};

const iconStyle = color => ({
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  border: `solid 3px ${color}`,
  background: color,
  color: '#ffffff',
  fontWeight: '900',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '5px'
});

const sortObject = obj => {
  const reference = Object.values(obj);
  return reference
    .sort((a, b) => a - b)
    .reduce((prev, next, index) => {
      const key = Object.keys(obj).find(k => obj[k] === next && !prev[k]);

      // has another model at the same level
      if (Object.keys(obj).find(k => obj[k] === next && prev[k])) {
        prev[key] = index - 1;
        return prev;
      }
      prev[key] = index;
      return prev;
    }, {});
};

const calculateLevel = models => {
  // hasOne, hasMany, belongsTo, belongsToMany
  const levels = models.reduce((allLevels, model) => {
    model.associates.forEach(associate => {
      allLevels[model.modelName] = allLevels[model.modelName] || 0;
      allLevels[associate.toModel] = allLevels[associate.toModel] || 0;
      if (associate.type === 'hasOne' || associate.type === 'belongsToMany') {
        allLevels[model.modelName] += 0;
        allLevels[associate.toModel] += 0;
      } else if (associate.type === 'hasMany') {
        allLevels[model.modelName] += -1;
        allLevels[associate.toModel] += 1;
      } else if (associate.type === 'belongsTo') {
        allLevels[model.modelName] += 1;
        allLevels[associate.toModel] += -1;
      } else {
        console.log('Error!');
      }
    });
    return allLevels;
  }, {});
  return sortObject(levels);
};

const ModelCard = React.forwardRef(
  ({ openAll, model, migration, hideSystemFields, level }, ref) => {
    const [open, setOpen] = React.useState(openAll);
    React.useEffect(() => {
      setOpen(openAll);
    }, [openAll]);
    return (
      <div style={{ ...cardStyles(colors.background) }} ref={ref}>
        <div style={rowStyle}>
          <button
            type="button"
            onClick={() => {
              setOpen(!open);
            }}
            style={{
              ...iconStyle(colors.info),
              margin: 0,
              marginRight: '5px',
              padding: 0,
              width: 40,
              height: 40,
              cursor: 'pointer'
            }}
          >
            {open ? '-' : '+'}
          </button>
          <h2 style={titleStyle}>
            {model.modelName}:{migration.modelName}
          </h2>
        </div>
        <div style={columnStyle}>
          {open &&
            (model.fields || model.associates) &&
            [
              ...(model.fields || []).map(m => ({ ...m, trueType: 'field' })),
              ...(model.associates || []).map(m => ({ ...m, trueType: 'rel' }))
            ]
              .sort((a, b) => {
                const aKey =
                  a.trueType === 'field' ? a.fieldName : a.foreignKey;
                const bKey =
                  b.trueType === 'field' ? b.fieldName : b.foreignKey;
                return aKey && aKey.localeCompare(bKey);
              })
              .map(item => {
                if (item.trueType === 'field') {
                  const { fieldName, properties } = item;
                  const type = properties.find(
                    property => property.propertyName === 'type'
                  );
                  const allowNull = properties.find(
                    property => property.propertyName === 'allowNull'
                  );
                  const color = type
                    ? type.value === 'DataTypes.STRING'
                      ? colors.string
                      : type.value === 'DataTypes.INTEGER'
                      ? colors.integer
                      : type.value === 'DataTypes.FLOAT'
                      ? colors.float
                      : colors.any
                    : colors.none;
                  return (
                    <div key={fieldName} style={cardStyles(color)}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {allowNull && allowNull.value === 'false' && (
                          <span style={iconStyle(colors.error)}>!</span>
                        )}
                        <h3>{fieldName}</h3>
                      </div>
                    </div>
                  );
                } else {
                  const { type, toModel, foreignKey } = item;
                  return type === 'belongsTo' ? (
                    <div key={foreignKey} style={cardStyles(colors.relation)}>
                      <h3
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        {foreignKey}
                        <span
                          style={{
                            ...iconStyle(colors.pointer),
                            margin: '0 5px',
                            width: 'auto',
                            borderRadius: '30px',
                            display: 'flex',
                            fontSize: '10px',
                            fontWeight: '100',
                            alignItems: 'center',
                            padding: '0 10px'
                          }}
                        >
                          &gt;-
                        </span>
                        {toModel}
                      </h3>
                    </div>
                  ) : null;
                  // (
                  //   <div key={foreignKey || through}>{toModel}</div>
                  // )
                }
              })}
          {open &&
            model.associates &&
            model.associates
              .filter(model => model.through)
              .sort((a, b) => {
                return a.through && a.through.localeCompare(b.through);
              })
              .map(item => {
                const { toModel, through } = item;
                return (
                  <div key={through} style={cardStyles(colors.pointer)}>
                    <h3
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      {through}
                      <span
                        style={{
                          ...iconStyle(colors.relation),
                          margin: '0 5px',
                          width: 'auto',
                          borderRadius: '30px',
                          display: 'flex',
                          fontSize: '10px',
                          fontWeight: '100',
                          alignItems: 'center',
                          padding: '0 10px'
                        }}
                      >
                        &gt;&lt;
                      </span>
                      {toModel}
                    </h3>
                  </div>
                );
              })}
        </div>
        <div style={columnStyle}>
          {open &&
            migration.fields &&
            migration.fields
              .sort((a, b) => a.fieldName.localeCompare(b.fieldName))
              .map(({ fieldName, properties }) => {
                const type = properties.find(
                  property => property.propertyName === 'type'
                );
                const allowNull = properties.find(
                  property => property.propertyName === 'allowNull'
                );
                const color = systemFields.includes(fieldName)
                  ? colors.error
                  : type
                  ? type.value === 'Sequelize.STRING'
                    ? colors.string
                    : type.value === 'Sequelize.INTEGER'
                    ? colors.integer
                    : type.value === 'Sequelize.FLOAT'
                    ? colors.float
                    : colors.any
                  : colors.none;
                return hideSystemFields &&
                  systemFields.includes(fieldName) ? null : (
                  <div key={fieldName} style={cardStyles(color)}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {allowNull && allowNull.value === 'false' && (
                        <span style={iconStyle(colors.error)}>!</span>
                      )}
                      <h3>{fieldName}</h3>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    );
  }
);

const App = () => {
  const [refs, setRefs] = React.useState({});
  const [openAll, setOpenAll] = React.useState(false);
  const [hideSystemFields, setHideSystemFields] = React.useState(false);
  const levels = React.useMemo(() => calculateLevel(models), [models]);
  React.useEffect(() => {
    if (models) {
      const modelRefs = models.reduce((prev, model) => {
        return { ...prev, [model.modelName]: React.createRef() };
      }, {});
      setRefs(modelRefs);
    }
  }, [models]);
  return (
    <div style={appStyles}>
      <button type="button" onClick={() => setOpenAll(!openAll)}>
        {openAll ? 'Collapse All' : 'Expand All'}
      </button>
      <button
        type="button"
        onClick={() => setHideSystemFields(!hideSystemFields)}
      >
        {hideSystemFields ? 'Show System Fields' : 'Hide System Fields'}
      </button>
      {Object.values(levels)
        .filter((level, index, arr) => arr.indexOf(level) === index)
        .map(level => (
          <div
            key={level}
            style={{
              ...rowStyle,
              paddingLeft: `${level * 50}px`,
              alignItems: 'flex-start'
            }}
          >
            {models &&
              models
                .filter(model => levels[model.modelName] === level)
                .map(model => (
                  <ModelCard
                    key={model.modelName}
                    model={model}
                    openAll={openAll}
                    hideSystemFields={hideSystemFields}
                    migration={
                      migrations.find(
                        migration =>
                          migration.modelName
                            .replace(/ies$/, 'y')
                            .replace(/s$/, '') === model.modelName
                      ) || null
                    }
                    level={levels[model.modelName]}
                    ref={refs[model.modelName]}
                  />
                ))}
          </div>
        ))}
      {migrations &&
        migrations
          .filter(
            migration =>
              !models
                .map(model => model.modelName)
                .includes(
                  migration.modelName.replace(/ies$/, 'y').replace(/s$/, '')
                )
          )
          .map(migration => (
            <ModelCard
              key={migration.modelName}
              model={{}}
              openAll={openAll}
              hideSystemFields={hideSystemFields}
              migration={migration}
              ref={null}
            />
          ))}
      {/* {models &&
        models
          .sort((a, b) => levels[a.modelName] - levels[b.modelName])
          .map(model => (
            <ModelCard
              key={model.modelName}
              model={model}
              level={levels[model.modelName]}
              ref={refs[model.modelName]}
            />
          ))} */}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
