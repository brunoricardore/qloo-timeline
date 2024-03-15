const YearBadge = (({ year, active, onYearSelected }: { year: string, active: boolean, onYearSelected: (year: string) => void }) => {
    return <div className="badge-wrapper">
        <button onClick={() => onYearSelected(year)} className={'badge'+(active ? ' active' : '')}>
            {year}
        </button>
    </div>
});

export default YearBadge;