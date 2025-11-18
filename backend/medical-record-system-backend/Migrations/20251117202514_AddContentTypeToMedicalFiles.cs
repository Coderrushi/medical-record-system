using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace medical_record_system_backend.Migrations
{
    /// <inheritdoc />
    public partial class AddContentTypeToMedicalFiles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ContentType",
                table: "MedicalFiles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContentType",
                table: "MedicalFiles");
        }
    }
}
